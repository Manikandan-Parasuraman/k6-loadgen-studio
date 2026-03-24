from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

from k6_runner import run_k6
from chroma_client import store_result, get_similar
from recommender import recommend
from fastapi.responses import StreamingResponse
from postman_parser import parse_postman
from report_store import save_report, get_report, get_all_reports
from pdf_generator import generate_pdf_report

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TestConfig(BaseModel):
    url: str
    method: str
    vus: int
    duration: str

@app.post("/run-test")
def run_test(config: TestConfig):
    result = run_k6(config.dict())

    report_id = str(uuid.uuid4())

    store_result(config.dict(), result)
    save_report(report_id, result)

    recommendation = recommend(config.url)

    return {
        "report_id": report_id,
        "result": result,
        "recommendation": recommendation
    }

@app.get("/report/{id}")
def report(id: str):
    return get_report(id)

@app.get("/history")
def get_history():
    return get_all_reports()

@app.get("/report/{id}/pdf")
def get_report_pdf(id: str):
    data = get_report(id)
    pdf_buffer = generate_pdf_report(id, data)
    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=report_{id}.pdf"}
    )

@app.post("/upload-postman")
def upload(file: UploadFile):
    return parse_postman(file.file.read())