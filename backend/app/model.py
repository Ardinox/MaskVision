from pydantic import BaseModel

class ProcessResponse(BaseModel):
    status: str
    filename: str
    download_url: str
    message: str

class DeleteResponse(BaseModel):
    status: str
    message: str