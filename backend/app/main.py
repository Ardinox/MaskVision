import cv2
from backend.app.services.redacted import (
    redact_frame,
    detect_sensitive_text,
    detect_qr,
    apply_masks,
)

# Run OCR every 5 frames
OCR_INTERVAL = 5

# Process a single image
def process_Image():
    image = cv2.imread("backend/app/uploads/qr_id.jpg")

    if image is None:
        raise FileNotFoundError("Could not load image")

    processed = redact_frame(image)

    output_path = "backend/app/processed/masked_image3.jpg"
    cv2.imwrite(output_path, processed)

    print(f"Saved output to {output_path}")


# Process a video frame by frame
def process_video():
    cap = cv2.VideoCapture("backend/app/uploads/qr_id.mp4")

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(
        "backend/app/processed/masked_output.mp4",
        fourcc,
        fps,
        (width, height),
    )

    frame_count = 0

    # Stores the latest detected text and QR bounding boxes
    previous_detections = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # Refresh detections on the first frame and then every OCR_INTERVAL frames
        if frame_count == 1 or frame_count % OCR_INTERVAL == 0:

            text = detect_sensitive_text(frame)
            qr = detect_qr(frame)

            new_detections = text + qr

            # Update cache only if something was detected
            if new_detections:
                previous_detections = new_detections

        # Blur using the most recent detections
        apply_masks(frame, previous_detections)

        out.write(frame)
        print(f"Processed frame {frame_count}...")

    cap.release()
    out.release()

    print("Video Processing Complete! Saved to masked_output")

process_video()