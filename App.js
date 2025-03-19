import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages
    setIsLoading(true); // Show loading state

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error getting response from AI.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="chat-container">
      <h1>AI Chatbot (Qwen 2.5)</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
      {isLoading && <div className="loading-spinner"></div>} {/* Loading Spinner */}
      <div className="response">{response}</div>
    </div>
  );
}

export default App;
