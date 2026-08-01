from fastapi import FastAPI
from app.api.routes.masking import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api", tags=["API"])
async def get_api():
    return {
        "message": "MaskVision API is listening."
    }

app.include_router(router)