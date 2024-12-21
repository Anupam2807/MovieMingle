import { useState, useRef, useEffect } from "react";
import axios from "axios";
import BotCard from "./BotCard";
import { TbMessageChatbot } from "react-icons/tb";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! How can I help you find movies or TV shows today?'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await axios.post(`${backendUrl}/api/chatbot`, {
        query: inputValue,
      });

      const movies = response.data.data;

      if (response.data.message == "Fallback") {
        const fallbackMessage = {
          id: messages.length + 2,
          type: "bot",
          content: movies,
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }else{

      

      const movieMessage = {
        id: messages.length + 2,
        type: "bot",
        content: movies,
      };  

      setMessages((prev) => [...prev, movieMessage]);
    }
    } catch (error) {
      // Handle error case
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        content:
          "We are unable to process your request at the moment. This might be due to a server error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#F68B1F] text-white flex items-center justify-center shadow-lg hover:bg-[#E57D1E] transition-colors"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <TbMessageChatbot className="text-3xl" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0   h-[600px] bg-gradient-to-b from-[#1a1f2c] to-[#0d1117] rounded-lg shadow-xl flex flex-col border border-gray-700">
          <div className="p-4 bg-gradient-to-r from-purple-900 to-[#1a1f2c] rounded-t-lg border-b border-gray-700">
            <h3 className="text-white font-semibold">Movie Mingle Assistant</h3>
            <p className="text-gray-300 text-sm">
              Ask me about movies and TV shows
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" &&
                typeof message.content === "object" ? (
                  <BotCard movie={message.content} />
                ) : (
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-[#F68B1F] text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-700"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg bg-gray-700 text-white placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-[#F68B1F]"
              />
              <button
                type="submit"
                className="bg-[#F68B1F] text-white px-4 py-2 rounded-lg hover:bg-[#E57D1E] transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
