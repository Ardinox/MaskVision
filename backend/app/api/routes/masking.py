from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

from app.model import ProcessResponse, DeleteResponse
from app.services.processing import process_image, process_video

router = APIRouter(prefix="/api/functions", tags=["Functions"])

UPLOAD_DIR = Path("app/uploads")
OUTPUT_DIR = Path("app/processed")

# Creates the necessary directories if not available
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def save_file(file: UploadFile) -> Path:
    """
    Saves the file in the server for processing.

    Args:
        File: Image / Video sent by frontend.

    Returns:
        input_path: where the file is saved.
    """
    unique_filename = f"{uuid.uuid4().hex}_{Path(file.filename).name}"
    input_path = UPLOAD_DIR / unique_filename

    try:
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as exe:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {exe}")

    return input_path


@router.post("/mask/photo", response_model=ProcessResponse)
async def mask_photos(file: UploadFile = File(...)):
    """
    API : for image masking

    Args:
        File: Image sent by frontend.

    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image file.")

    input_path = save_file(file)

    output_path = OUTPUT_DIR / f"masked_{input_path.name}"

    try:
        process_image(input_path=str(input_path), output_path=str(output_path))
    except Exception as exe:
        raise HTTPException(status_code=500, detail=f"Processing failed: {exe}")

    return ProcessResponse(
        status="success",
        filename=output_path.name,
        download_url=output_path.name,
        message="Photo masked successfully.",
    )


@router.post("/mask/video", response_model=ProcessResponse)
async def mask_videos(file: UploadFile = File(...)):
    """
    API : for Video masking

    Args:
        File: Videos sent by frontend.

    """
    if not file.content_type or not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid video file.")

    input_path = save_file(file)
    output_path = OUTPUT_DIR / f"masked_{input_path.name}"

    try:
        process_video(
            input_path=str(input_path),
            output_path=str(output_path),
        )
    except Exception as exe:
        raise HTTPException(
            status_code=500,
            detail=str(exe),
        )

    return ProcessResponse(
        status="success",
        filename=output_path.name,
        download_url=output_path.name,
        message="Video masked successfully.",
    )


@router.get("/download/{filename}")
async def download_file(filename: str):
    """
    API : For processed media downloading.

    Args
        filename: sent by frontend that the process photo/video sent them them earlier.

    """
    filename = Path(filename).name

    file_path = OUTPUT_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path=file_path, filename=filename)


@router.delete("/delete/{filename}", response_model=DeleteResponse)
async def delete_media(filename: str):
    """
    API : For processed media deletion.

    Args
        filename: sent by frontend that the process photo/video api sent them them earlier.

    """
    filename = Path(filename).name
    original_filename = filename.replace("masked_", "", 1)

    upload_path = UPLOAD_DIR / original_filename
    processed_path = OUTPUT_DIR / filename

    if not upload_path.exists() and not processed_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    upload_path.unlink(missing_ok=True)
    processed_path.unlink(missing_ok=True)

    return DeleteResponse(status="success", message="File Deleted Successfully")
