import cv2
import numpy as np
from pyzbar.pyzbar import decode

image_path = "backend/app/uploads/qrDemo.jpg"
image = cv2.imread(image_path)

if image is None:
    raise FileNotFoundError(f"Could not load image at {image_path}")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

qr_codes = decode(gray)
print(f"Detected QR Codes: {len(qr_codes)}")

img_h, img_w = image.shape[:2]

for qr in qr_codes:
    rect = qr.rect
    x, y, w, h = rect.left, rect.top, rect.width, rect.height

    pad = 10
    x_min = max(0, x - pad)
    y_min = max(0, y - pad)
    x_max = min(img_w, x + w + pad)
    y_max = min(img_h, y + h + pad)

    roi = image[y_min:y_max, x_min:x_max]
    
    if roi.size > 0:
        blurred_roi = cv2.GaussianBlur(roi, (99, 99), 30)
        image[y_min:y_max, x_min:x_max] = blurred_roi
        print(f"Successfully blurred {qr.type} at X:[{x_min}-{x_max}], Y:[{y_min}-{y_max}]")

output_path = "backend/app/uploads/masked_image.jpg"
cv2.imwrite(output_path, image)
print(f"Saved output to {output_path}")