import cv2


def create_trackers(frame, detections):
    """
    Create one CSRT tracker for each detection.

    Args:
        frame: Current video frame.
        detections: List of detections from OCR/QR detection.

    Returns:
        List of tracker dictionaries.
    """

    trackers = []

    for detection in detections:
        x_min, y_min, x_max, y_max = detection["bbox"]

        width = x_max - x_min
        height = y_max - y_min

        tracker = cv2.legacy.TrackerCSRT_create()
        tracker.init(frame, (x_min, y_min, width, height))

        trackers.append(
            {
                "tracker": tracker,
                "type": detection["type"],
                "mask_type": detection.get("mask_type"),
            }
        )

    return trackers


def update_trackers(frame, trackers):
    """
    Update every tracker and return the new detections.

    Args:
        frame: Current video frame.
        trackers: List returned by create_trackers().

    Returns:
        Updated detections in the same format expected by apply_masks().
    """

    updated_detections = []

    for tracker_data in trackers:

        success, bbox = tracker_data["tracker"].update(frame)

        if not success:
            continue

        x, y, w, h = bbox

        x_min = int(x)
        y_min = int(y)
        x_max = int(x + w)
        y_max = int(y + h)

        updated_detections.append(
            {
                "bbox": (x_min, y_min, x_max, y_max),
                "type": tracker_data["type"],
                "mask_type": tracker_data["mask_type"],
            }
        )

    return updated_detections