import easyocr
import numpy as np
import cv2
from pattern import detect_id_type

reader = easyocr.Reader(["en"])

def redact_image(frame):
    result = reader.readtext(frame)

    for bbox, text, confidence in result:
        id_type, mask_type = detect_id_type(text)

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