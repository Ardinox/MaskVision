# PII Masking Project – OCR Detection Issues & Optimization Notes

## Performance Optimisations

### Initial Problem

OCR was executed on every frame.

Result:

```bash
30 FPS video
 ↓
30 OCR calls for every second 
 ↓
High Processing Time
```

---

**Solution 1** — Frame Skipping

Run OCR every 15 frames.

Skipped frames reuse the most recent OCR detections while CSRT trackers estimate the new object positions, avoiding expensive OCR execution on every frame.

Benefit:

- Significantly reduced processing time while maintaining acceptable masking accuracy.
- Minimal quality loss during processing.

**Solution 2** — CSRT Tracking

CSRT was chosen over lighter trackers because it provides better robustness against scale changes and partial occlusions, resulting in more stable masking between OCR passes.

Pipeline:

```bash
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

**Solution 3** — OCR Preprocessing

The preprocessing pipeline improves text visibility before OCR, increasing detection reliability on low-quality images.

Added:

- Image upscaling
- CLAHE
- Sharpening
- Confidence threshold
- OCR text normalization

Results:

- Improved OCR detection reliability, especially on lower-quality inputs.
- Increased regex matching accuracy after text normalization.

---

## Progress Log

### 23 July 2026

**Unified Masking Pipeline**:

- Combined OCR masking and QR masking.
- Introduced `redact_frame()`.
- Added dynamic Gaussian blur for QR codes.
- Verified four test cases successfully.

---

## 24 July 2026

**OCR Improvements**:

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

### 25 July 2026

**Video Optimisation**:

- Refactored detection and masking.
- Added frame skipping.
- Introduced detection caching.
- Reduced processing time significantly.

**CSRT Object Tracking**:

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

### 26 July 2026 (FastAPI Backend)

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

### 27–31 July 2026 (Frontend Development)

- Built the Landing and About pages
- Implemented Navbar, Footer, and theme toggle
- Implemented Upload, Preview, Processing, and Result components
- Added drag-and-drop file upload
- Added responsive UI with dark mode support
- Added toast-based error handling
- Created the project logo and graphics using Canva

---

### 1 August 2026 (API Integration and Dockerization)

Implemented:

- Integrated backend using Axios and resolved CORS issues
- Dockerized both frontend and backend
- Implemented a multi-stage Docker build for the Next.js frontend
- Reduced backend image size by switching to OpenCV headless packages
- Added Docker Compose configuration

---

### 2 August 2026 (Project Polish)

Implemented:

- Centralized API error handling
- Added toast notifications for upload, download, and server errors
- Added client-side file validation
- Improved processing and result UI
- Updated project documentation
- Prepared project for GitHub deployment
