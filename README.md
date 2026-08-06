![MaskVision Thumbnail](Assets/GithubHeader.png)

# MaskVision

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Python](https://img.shields.io/badge/Python-3.13-blue)
![Containerization](https://img.shields.io/badge/Containerization-Docker-2496ED)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

An AI-powered web application that detects and masks Personally Identifiable Information (PII), including Aadhaar numbers, PAN numbers, and QR codes, in images and videos while preserving the remaining visual content.

## Table of Contents

- Problem Statement
- Features
- Tech Stack
- Work Flow
- Project Structure
- Installation
- Docker
- Environment Variables
- Usage
- Limitations
- Future Improvements
- Usefull Links
- License

## Problem Statement

Develop a system that automatically detects Personally Identifiable Information (PII) in photos /videos and masks sensitive regions while keeping the rest of the frame intact.

The application focuses on:

- Detecting Aadhaar numbers
- Detecting PAN numbers
- Detecting QR codes
- Masking only sensitive information
- Preserving faces and background content

## Features

- Upload images and videos
- Automatic detection of Aadhaar numbers
- Automatic detection of PAN numbers
- QR code detection and masking
- Intelligent frame skipping for faster video processing
- CSRT tracker for smoother masking between OCR frames
- Automatic preprocessing before OCR
- Secure file download
- Automatic cleanup of processed files
- Responsive Next.js frontend
- Dockerized frontend and backend
- Automatic client-side validation for file type and size
- User-friendly error handling with toast notifications
- Automatic file deletion when user uploads a new file or moves away from the service page

## Tech Stack

### Frontend Stack

- **Next.js** *(React framework)* – Modern frontend framework for building the user interface.
- **TypeScript** *(Typed JavaScript)* – Adds static typing for better maintainability and fewer runtime errors.
- **Shadcn UI** *(Component library)* – Provides accessible, customizable UI components.
- **Axios** *(HTTP client)* – Handles communication between the frontend and backend.

### Backend Stack

- **FastAPI** *(Python API framework)* – Serves REST APIs and manages the OCR processing pipeline.
- **EasyOCR** *(OCR engine)* – Extracts text from images and video frames.
- **OpenCV** *(Computer vision library)* – Performs image preprocessing and masking operations.
- **pyzbar** *(Barcode/QR decoder)* – Detects and decodes QR codes for secure masking.

### Containerization

- **Docker** *(Containerization platform)* – Ensures consistent deployment across different environments.

## Work Flow

```bash
   User Upload
       │
       ▼
Next.js Frontend
       │
       ▼
 FastAPI Backend
       │
       ▼
  Preprocessing
       │
       ▼
EasyOCR + QR Detection
       │
       ▼
 CSRT Tracking
       │
       ▼
  PII Masking
       │
       ▼
 Processed Media
       │
       ▼
    Download
```

## Project Structure

### Backend Structure

```text
|
└──📁backend
    └──📁app
        └── 📁api
            └── 📁routes
                ├── __init__.py
                └── masking.py
        └── 📁services
            ├── ocr_utils.py
            ├── pattern.py
            ├── preprocessing.py
            ├── processing.py
            ├── redacted.py
            └── tracker.py
        └── 📁processed
            └── .gitkeep
        └── 📁uploads
            └──.gitkeep
        ├── main.py
        └── model.py
    ├── .dockerignore
    ├── Dockerfile
    └── requirements.txt
```

### Frontend Structure

```text
└── 📁frontend
    └── 📁public
    └── 📁src
        └── 📁api
            ├── axios.ts
            ├── downloadAndDelete.ts
            └── upload.ts
        └── 📁app
            └── 📁about
                └── page.tsx
            └── 📁services
                └── page.tsx
            ├── favicon.ico
            ├── globals.css
            ├── layout.tsx
            └── page.tsx
        └── 📁components
            └── 📁providers
                └── theme-provider.tsx
            └── 📁ui
                ├── button.tsx
                └── dropdown-menu.tsx
            ├── ComparisionSection.tsx
            ├── Footer.tsx
            ├── HeroSection.tsx
            ├── Navbar.tsx
            ├── PreviewCard.tsx
            ├── ProcessingCard.tsx
            ├── ResultCard.tsx
            ├── ThemeToggle.tsx
            ├── UploadCard.tsx
            └── WorkflowSection.tsx
        └── 📁lib
            ├── handleApiError.ts
            ├── techList.ts
            ├── utils.ts
            └── workflow.ts
        └── 📁types
            └── api.ts
    ├── .dockerignore
    ├── .env.local
    ├── components.json
    ├── Dockerfile
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    └── tsconfig.json
```

## Installation

### Backend

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment.

Windows:

```bash
.venv\Scripts\activate
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Docker

Run the application using Docker Compose:

```bash
docker compose up --build
```

Once the containers start successfully, open:

```bash
http://localhost:3000
```

## Environment Variables

Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/functions
```

## Usage

1. Start the backend server.
2. Start the frontend.
3. Open `http://localhost:3000`.
4. Upload an image or video.
5. Process the media.
6. Download the masked output.

## Limitations

This project uses **EasyOCR** for text detection and therefore inherits many of the limitations associated with OCR-based systems. To improve detection accuracy and processing efficiency, several optimizations were implemented, including:

- **Frame skipping** to reduce processing time while maintaining acceptable detection performance.
- **CSRT object tracking** to track detected IDs across consecutive frames instead of running OCR on every frame.
- **Image preprocessing** to enhance frame quality before OCR.
- **Text normalization** to improve regex matching for extracted text.

Despite these improvements, certain limitations remain:

- **Poor image quality** (blur, low resolution, noise, or poor lighting) can reduce OCR accuracy.
- **Partially visible or cropped IDs** may not be detected, as the application validates the complete ID using regular expressions.
- **Rapid camera or object movement** can lead to inconsistent detections between frames.
- **Rotated or heavily tilted ID cards** may produce incomplete OCR results.
- **Severe motion blur or video compression artifacts** can negatively affect both text detection and QR code recognition.
- **Processed files are automatically removed** when the user starts a new upload or leaves the application through normal navigation. Files may remain on the server if the browser or tab is closed unexpectedly.

## Future Improvements

- Deploy backend for live processing
- GPU acceleration using CUDA
- Support additional government IDs
- Automatic orientation correction
- Improved OCR using deep learning models
- Batch processing support

## Usefull Links

[**Progress Report:**](Note.md) Daily backend development progress is documented here.

[**Demo:**](DEMO.md) The Screenshot of the working model is documented here

## License

This project is licensed under the [MIT License](LICENCE.txt).
