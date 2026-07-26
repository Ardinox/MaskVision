# PII Masking Project – OCR Detection Issues & Optimization Notes

# Known Limitations

## Aadhaar VID Detection

### Issue

VID detection is still inconsistent in videos.

### Root Cause

This is primarily an OCR limitation rather than a regex issue.

EasyOCR sometimes:

- misses the VID completely
- segments the text incorrectly
- produces low-confidence predictions on motion-blurred frames

Example:

Instead of:

```
9185 7890 6417 0314
```

EasyOCR returned:

```
9185 7890
6417 0314
```

Since my regex expected all 16 digits in a single string, it failed to match the VID.


### Possible Future Improvements

- PaddleOCR
- Fine-tuned OCR
- YOLO-based document detection
- Better preprocessing
- OCR ensemble

---

# Performance Optimisations

## Initial Problem

OCR was executed on every frame.

Result:

```
30 FPS video
 ↓
30 OCR calls for every second 
 ↓
Very Slow Processing
```

---

### Solution 1 — Frame Skipping

Run OCR every 5 frames.

Skipped frames reuse previous detections.

Benefit:

- Huge speed improvement
- Minimal quality loss

---

### Solution 2 — CSRT Tracking

Pipeline:

```
OCR
 ↓
Create CSRT Trackers
 ↓
Update Bounding Boxes
 ↓
Apply Gaussian Blur
```


Benefits:

- OCR runs much less frequently
- Bounding boxes remain aligned
- Much smoother masking

---

### Solution 3 — OCR Preprocessing

Added:

- Image upscaling
- CLAHE
- Sharpening
- Confidence threshold
- OCR text normalization

Result:

- Better OCR accuracy
- Better masking quality

---

# Current Pipeline

Image

```
Input Image
↓
OCR Preprocessing
↓
EasyOCR
↓
Regex Validation
↓
QR Detection
↓
Gaussian Blur
↓
Output Image
```

Video

```
Input Video
↓
OCR (Every 5 Frames)
↓
CSRT Tracker
↓
Gaussian Blur
↓
Output Video
```


---

# Progress Log

## 23 July 2026

### Unified Masking Pipeline

- Combined OCR masking and QR masking.
- Introduced `redact_frame()`.
- Added dynamic Gaussian blur for QR codes.
- Verified four test cases successfully.

---

## 24 July 2026

### OCR Improvements

- Added preprocessing pipeline.
- Added CLAHE.
- Added sharpening.
- Fixed OCR coordinate scaling.
- Added confidence threshold.
- Increased Gaussian blur strength.
- Created `ocr_utils.py`.
- Normalized OCR text before regex matching.

Known issue:

- VID detection still inconsistent.

---

## 25 July 2026

### Video Optimisation

- Refactored detection and masking.
- Added frame skipping.
- Introduced detection caching.
- Reduced processing time significantly.

### CSRT Object Tracking

- Added CSRT tracker.
- Refactored into Detection → Tracking → Masking.
- Tracker updates bounding boxes between OCR runs.
- Improved masking stability.
- Reduced OCR workload further.

Current Result:

- Aadhaar masking is reliable.
- QR masking is reliable.
- VID remains OCR-limited.

---

## 26 July 2026

### FastAPI Backend

Implemented:

- Image upload API
- Video upload API
- Download endpoint
- Delete endpoint
- UUID-based filenames
- Pydantic response models
- File type validation
- Error handling
- Path sanitization

Backend is ready for frontend integration.

---

# Future Improvements

## Backend

- Async background processing
- Progress tracking
- Processing queue
- Docker deployment
- Logging

## Frontend

- Next.js UI
- Upload page
- Progress bar
- Download page
- Before/After preview

## Detection

- Better OCR model
- GPU inference
- Resize before OCR
- Multi-line OCR merging
- YOLO document detector