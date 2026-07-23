import easyocr
import numpy as np
import cv2
from backend.app.services.pattern import detect_id_type
from pyzbar.pyzbar import decode

reader = easyocr.Reader(["en"])

# This function masks QR codes from each of the frames
def mask_qr(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    qr_codes = decode(gray)

    img_h, img_w = frame.shape[:2]

    for qr in qr_codes:
        rect = qr.rect
        x, y, w, h = rect.left, rect.top, rect.width, rect.height

        pad = 10
        x_min = max(0, x - pad)
        y_min = max(0, y - pad)
        x_max = min(img_w, x + w + pad)
        y_max = min(img_h, y + h + pad)

        roi = frame[y_min:y_max, x_min:x_max]

        if roi.size == 0:
            continue

        roi_h, roi_w = roi.shape[:2]

        # Base kernel on the smaller ROI dimension
        k_size = max(3, int(min(roi_h, roi_w) * 0.2))

        # Kernel size must be odd
        if k_size % 2 == 0:
            k_size += 1

        blurred_roi = cv2.GaussianBlur(roi, (k_size, k_size), 30)
        frame[y_min:y_max, x_min:x_max] = blurred_roi

    return frame

# This function masks sensitive text from each of the frames
def mask_sensitive_text(frame):
    result = reader.readtext(frame)

    for bbox, text, confidence in result:
        id_type, mask_type = detect_id_type(text) # This function is defined in pattern.py to detect sensitive text using REGEX

        if id_type:
            clean_text = text.strip()
            pts = np.array(bbox, dtype=np.int32)
            x_min = int(min(pts[:, 0]))
            x_max = int(max(pts[:, 0]))
            y_min = int(min(pts[:, 1]))
            y_max = int(max(pts[:, 1]))

            total_width = x_max - x_min
            x_mask_end = x_max

            if mask_type == "FIRST_8":
                total_chars = len(clean_text)
                masked_chars_counts = 10 if " " in clean_text else 8
                mask_ratio = masked_chars_counts / total_chars
                x_mask_end = x_min + int(total_width * mask_ratio)

            roi = frame[y_min:y_max, x_min:x_mask_end]

            if roi.shape[0] > 0 and roi.shape[1] > 0:
                k_w = min(roi.shape[1] // 2 * 2 + 1, 23)
                k_h = min(roi.shape[0] // 2 * 2 + 1, 23)
                k_w = max(k_w, 3)
                k_h = max(k_h, 3)

                blurred_roi = cv2.GaussianBlur(roi, (k_w, k_h), 30)
                frame[y_min:y_max, x_min:x_mask_end] = blurred_roi

    return frame

# If this function is called for a 'frame' it will first mask sensitive text and then mask qr and return that frame back
def redact_frame(frame):
    frame = mask_sensitive_text(frame)
    frame = mask_qr(frame)
    return frame


# This part is only for temporary testings
image = cv2.imread("backend/app/uploads/qr_id.jpg")
if image is None:
    raise FileNotFoundError(f"Could not load image")

processed = redact_frame(image)
output_path = "backend/app/processed/masked_image3.jpg"
cv2.imwrite(output_path, processed)
print(f"Saved output to {output_path}")
