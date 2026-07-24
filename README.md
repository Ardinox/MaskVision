# MaskVision

An AI-powered web application that detects and masks sensitive information such as Aadhaar numbers, PAN numbers, and QR codes from videos and photos while preserving the remaining visual content.

## Problem Statement

Develop a system that automatically detects Personally Identifiable Information (PII) in photos /videos and masks sensitive regions while keeping the rest of the frame intact.

The application focuses on:

- Detecting Aadhaar numbers
- Detecting PAN numbers
- Detecting QR codes
- Masking only sensitive information
- Preserving faces and background content

## Tech Stack

### Frontend
- Next.js
- TypeScript

### Backend
- FastAPI

### Containerization
- Docker

## Features (Planned)

- Upload video files
- Automatic PII detection
- Blur/Pixelate sensitive information
- Aadhaar number masking
- PAN number masking
- QR code detection
- Preview processed videos
- Download masked videos

## Project Structure

```
.
├── frontend/      # Next.js application
├── backend/       # FastAPI server
└── README.md
```

## Project Status

🚧 This project is currently under active development.

More features, documentation, and deployment instructions will be added as development progresses. [Read More](Note.md)

## License

This project is created for educational purposes.