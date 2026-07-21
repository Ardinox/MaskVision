import cv2
from redacted import redact_image
cap = cv2.VideoCapture('backend/app/uploads/demo2.mp4')

fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('backend/app/uploads/masked_output.mp4', fourcc, fps, (width, height))

frame_count = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    frame_count += 1

    masked_frame = redact_image(frame)

    out.write(masked_frame)
    print(f"Processed frame {frame_count}...")

cap.release()
out.release()
print("Video Processing Complete! Saved to masked_output")

