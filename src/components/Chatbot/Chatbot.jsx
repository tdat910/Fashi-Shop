import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Xin chào! Mình là trợ lý Fashi Shop 👋 Mình có thể giúp bạn tìm sản phẩm, xem hàng sale hoặc tư vấn mua sắm!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Xin lỗi, mình không hiểu câu hỏi này 😅" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lỗi kết nối, bạn thử lại nhé!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>🛍️ Fashi Assistant</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message assistant chatbot-typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* Nút mở chat */}
      <button className="chatbot-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default Chatbot;