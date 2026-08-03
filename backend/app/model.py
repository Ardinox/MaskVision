from pydantic import BaseModel

class ProcessResponse(BaseModel):
    """
    For video or image processing api responses

    """
    status: str
    filename: str
    download_url: str
    message: str

class DeleteResponse(BaseModel):
    """
    For File deletion api responses.

    """
    status: str
    message: str