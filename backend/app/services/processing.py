import cv2
from app.services.redacted import (
    redact_frame,
    detect_sensitive_text,
    detect_qr,
    apply_masks,
)
from app.services.tracker import (
    create_trackers,
    update_trackers,
)

# Run OCR every 5 frames
OCR_INTERVAL = 15


# Process a single image
def process_image(input_path: str, output_path: str):
    image = cv2.imread(input_path)

    if image is None:
        raise FileNotFoundError("Could not load image")

    processed = redact_frame(image)

    cv2.imwrite(output_path, processed)

    print(f"Saved output to {output_path}")


# Process a video frame by frame
def process_video(input_path: str, output_path: str):
    cap = cv2.VideoCapture(input_path)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(
        output_path,
        fourcc,
        fps,
        (width, height),
    )

    frame_count = 0

    # Stores the latest detected text and QR bounding boxes
    previous_detections = []

    # tracker List
    trackers = []

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

                trackers = create_trackers(frame, previous_detections)

        # On skipped frames, let trackers estimate new positions
        if frame_count != 1 and frame_count % OCR_INTERVAL != 0:
            tracked_detections = update_trackers(frame, trackers)

            if tracked_detections:
                previous_detections = tracked_detections

        # Blur using the latest detections
        apply_masks(frame, previous_detections)

        out.write(frame)

    cap.release()
    out.release()

    print("Video Processing Complete! Saved to masked_output")
