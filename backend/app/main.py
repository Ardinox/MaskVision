from fastapi import FastAPI
from backend.app.api.routes.masking import router
app = FastAPI()

@app.get("/api", tags=["API"])
async def get_api():
    return {
        "message": "MaskVision API is listening."
    }

app.include_router(router)