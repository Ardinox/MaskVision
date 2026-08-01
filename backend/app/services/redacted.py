import easyocr
import numpy as np
import cv2
from app.services.pattern import detect_id_type
from app.services.preprocessing import preprocess_for_ocr, OCR_SCALE
from app.services.ocr_utils import normalize_ocr_text
from pyzbar.pyzbar import decode

# Confidence Threshold
OCR_CONFIDENCE_THRESHOLD = 0.45

reader = easyocr.Reader(["en"])


# Detect QR codes in a frame and return their bounding boxes.
def detect_qr(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    qr_codes = decode(gray)

    img_h, img_w = frame.shape[:2]
    detections = []

    for qr in qr_codes:
        rect = qr.rect
        x, y, w, h = rect.left, rect.top, rect.width, rect.height

        pad = 10
        x_min = max(0, x - pad)
        y_min = max(0, y - pad)
        x_max = min(img_w, x + w + pad)
        y_max = min(img_h, y + h + pad)

        detections.append({"bbox": (x_min, y_min, x_max, y_max), "type": "QR"})
    return detections

# Detects sensitive text from given the frames and return their bounding boxes
def detect_sensitive_text(frame):
    processed_frame = preprocess_for_ocr(frame)
    result = reader.readtext(processed_frame)

    detections = []

    for bbox, text, confidence in result:

        # Remove false positives based on confidence
        if confidence < OCR_CONFIDENCE_THRESHOLD:
            continue

        normalized_text = normalize_ocr_text(text)
        id_type, mask_type = detect_id_type(
            normalized_text
        )  # This function is defined in pattern.py to detect sensitive text using REGEX

        if id_type:

            pts = np.array(bbox, dtype=np.float32)

            # Convert coordinates back to original image size
            pts /= OCR_SCALE
            pts = pts.astype(np.int32)

            x_min = int(min(pts[:, 0]))
            x_max = int(max(pts[:, 0]))
            y_min = int(min(pts[:, 1]))
            y_max = int(max(pts[:, 1]))

            total_width = x_max - x_min
            x_mask_end = x_max

            # Calculating the width for first 8 Characters of Aadhar Number
            if mask_type == "FIRST_8":
                total_chars = len(normalized_text)
                masked_chars_counts = 10 if " " in normalized_text else 8
                mask_ratio = masked_chars_counts / total_chars
                x_mask_end = x_min + int(total_width * mask_ratio)

            detections.append(
                {
                    "bbox": (x_min, y_min, x_mask_end, y_max),
                    "type": id_type,
                    "mask_type": mask_type,
                }
            )
    return detections


def apply_masks(frame, detections):
    """
    Apply Gaussian blur to every detected sensitive region.

    Parameters:
        frame: Original image/frame.
        detections: List of detection dictionaries.
    """

    for detection in detections:

        x_min, y_min, x_max, y_max = detection["bbox"]

        roi = frame[y_min:y_max, x_min:x_max]

        if roi.size == 0:
            continue

        k_w = min(roi.shape[1] // 2 * 2 + 1, 41)
        k_h = min(roi.shape[0] // 2 * 2 + 1, 41)

        k_w = max(k_w, 3)
        k_h = max(k_h, 3)

        blurred_roi = cv2.GaussianBlur(roi, (k_w, k_h), 50)

        frame[y_min:y_max, x_min:x_max] = blurred_roi

# If called for a 'frame' it will apply masking and then return that frame back
def redact_frame(frame):
    text_detections = detect_sensitive_text(frame)
    qr_detections = detect_qr(frame)

    detections = text_detections + qr_detections

    apply_masks(frame, detections)
    return frame

