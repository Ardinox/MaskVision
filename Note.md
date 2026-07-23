# PII Masking Project – OCR Detection Issues & Optimization Notes

## Problem 1: Virtual ID (VID) was not detected

### What I observed

* Aadhaar Virtual IDs (16 digits) were sometimes not detected even though they were clearly visible in the video.
* Detection worked for some IDs but failed for others.

### Why it happened

EasyOCR does not always return an entire line of text as one string. For a 16-digit VID, it may split the text into multiple OCR outputs because of:

* Camera glare
* Motion blur
* Text alignment
* OCR segmentation

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

### Solutions explored

* Made the regex more flexible by allowing optional spaces and dashes between groups of digits.

```python
"AADHAAR_VID": {
    "pattern": r"\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b",
    "mask_type": "FULL",
}
```

* Use `re.search()` instead of `re.match()`.

  * `re.match()` only checks from the beginning of the string.
  * `re.search()` scans the entire OCR output, making detection more reliable.

---

# Problem 2: IDs were missed in some video frames

### What I observed

The same Aadhaar/PAN card was detected in one frame but not in the next few frames.

### Why it happened

The main reason is motion blur.

When the card moves:

* Character edges become blurred.
* OCR models cannot recognize the text accurately.
* As a result, detection temporarily fails for a few consecutive frames.

---

# Problem 3: Processing was extremely slow

### What I observed

A 1-second video took nearly 2 minutes to process.

### Why it happened

My current pipeline performs OCR on **every single frame**.

Example:

* 1-second video
* 30 FPS
* Total frames = 30

EasyOCR is a deep learning model (PyTorch-based).

Approximate CPU inference time:

* 3–5 seconds per frame

So,

```
30 frames × ~4 seconds/frame ≈ 120 seconds
```

This explains why processing a very short video took around two minutes.

---

# How production systems solve this

Banks and KYC systems do **not** run OCR on every frame. Instead, they combine OCR with lightweight tracking techniques.

## 1. Object Tracking (Best Optimization)

### Idea

Run OCR only occasionally.

Example workflow:

* Frame 1

  * Run EasyOCR.
  * Detect the text and its bounding box.

* Frames 2–29

  * Do **not** run OCR.
  * Use an OpenCV tracker (e.g., KCF) or trackers like SORT/ByteTrack to follow the detected bounding box.

* Frame 30

  * Run OCR again to refresh the detection.

### Benefit

Reduces expensive OCR calls by around **90%**, leading to a major speed improvement.

---

## 2. Frame Skipping

Instead of processing every frame:

* Process every 5th (or 6th) frame.
* Reuse the last detected bounding box for the skipped frames.

This works well when the card is moving smoothly.

---

## 3. Resize Frames Before OCR

Running OCR on a full HD frame is much slower than on a smaller image.

Workflow:

1. Resize the frame (e.g., 1920×1080 → 640×360).
2. Run EasyOCR on the smaller frame.
3. Obtain the bounding box coordinates.
4. Scale the coordinates back to the original resolution.
5. Apply the blur on the original high-resolution frame.

This significantly reduces OCR inference time.

---

## 4. GPU Acceleration

EasyOCR performs much faster on a CUDA-enabled GPU.

Approximate comparison:

* CPU: ~4 seconds/frame
* Modern GPU: ~0.05 seconds/frame

Production systems typically use CUDA with TensorRT or ONNX Runtime for maximum speed.

---

# Planned Improvements for My Project

To make the project more production-like:

1. **Frame Skipping**

   * Process only every 5th frame instead of every frame.

2. **Bounding Box Persistence**

   * If frame 5 detects an ID, reuse the same bounding box for frames 6–9.
   * Refresh the detection on frame 10.

3. **Later Enhancements**

   * Add object tracking (KCF, SORT, or ByteTrack).
   * Resize frames before OCR.
   * Use GPU acceleration whenever available.

---

# Expected Outcome

With just **frame skipping** and **bounding box persistence**, the estimated processing time can drop from approximately:

```
120 seconds
        ↓
~15 seconds (CPU)
```

while maintaining almost the same detection quality.

---

# Key Lesson Learned

The biggest bottleneck is **running OCR on every frame**. Production-grade video masking systems treat OCR as an expensive operation and minimize its usage by combining it with tracking, frame skipping, and GPU acceleration. These optimizations make real-time or near-real-time processing feasible.

# Progress Update (23 July 2026)

## Refactoring the Masking Pipeline

### Problem

QR code detection was implemented as a separate script (`qr_detector.py`) while OCR-based text masking was handled in `redacted.py`. This resulted in two independent masking pipelines.

### Solution

Integrated QR code detection into the main redaction pipeline and created a single function:

```python
redact_frame(frame)
```

Processing flow:

```
Frame
  ↓
OCR Detection
  ↓
Regex Validation
  ↓
Mask Sensitive Text
  ↓
QR Detection
  ↓
Mask QR Code
  ↓
Return Frame
```

### Dynamic QR Blur

Previously, a fixed Gaussian blur kernel (`99×99`) was used for every QR code, leading to inconsistent masking.

The kernel size is now calculated dynamically based on the QR code's bounding box while ensuring:
- Minimum kernel size of `3×3`
- Kernel size is always odd
- Blur strength scales with QR size

### Testing

Verified the unified pipeline on:

- QR code only
- Sensitive text only
- QR code + sensitive text
- Neither QR nor sensitive text

All four cases were processed successfully.

### Key Lesson Learned

A modular pipeline is easier to maintain and extend than multiple standalone scripts. Future improvements like preprocessing, frame skipping, and object tracking can now be added without changing the overall architecture.