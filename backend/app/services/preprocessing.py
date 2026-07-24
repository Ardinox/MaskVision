import cv2
import numpy as np

OCR_SCALE = 2.0

def preprocess_for_ocr(frame):
    """
    Preprocess an image before sending it to EasyOCR.

    Pipeline:
    1. Upscale image
    2. Convert to grayscale
    3. Improve local contrast using CLAHE
    4. Reduce noise
    5. Sharpen image

    Returns:
        Processed grayscale image.
    """
    # Step 1: Upscale image
    processed = cv2.resize(
        frame,
        None,
        fx=OCR_SCALE,
        fy=OCR_SCALE,
        interpolation=cv2.INTER_CUBIC
    )

    # Step 2: Convert to Grayscale
    gray = cv2.cvtColor(processed, cv2.COLOR_BGR2GRAY)

    # Step 3: CLAHE (Contrast Enhancement)
    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    gray = clahe.apply(gray)

    # Step 4: Denoise
    # gray = cv2.fastNlMeansDenoising(
    #     gray,
    #     None,
    #     h=10,
    #     templateWindowSize=7,
    #     searchWindowSize=21
    # )

    # Step 5: Sharpen
    sharpening_kernel = np.array([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ])

    gray = cv2.filter2D(
        gray,
        -1,
        sharpening_kernel
    )

    return gray