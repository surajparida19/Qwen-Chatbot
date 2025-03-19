from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama

app = FastAPI()

# Enable CORS to allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for security, specify ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = ollama.chat(
            model="qwen2.5",
            messages=[{"role": "user", "content": request.message}]
        )
        
        # Ensure the response structure is correct
        if "message" in response and "content" in response["message"]:
            return {"response": response["message"]["content"]}
        else:
            raise HTTPException(status_code=500, detail="Invalid response from Ollama API")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "qwen 2.5 chatbot API is running!"}
