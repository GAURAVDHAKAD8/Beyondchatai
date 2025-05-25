import { useState, useRef, useEffect } from "react";
import run from "./Gemini";

const CopilotBar = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState("copilot");

  const presetQuestion = "How do I get a refund?";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setLoading(true);
    setQuestion("");

    try {
      const aiResponse = await run(question);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
      console.error(error);
    }
    setLoading(false);
  };

  const handlePresetQuestion = async () => {

    setMessages((prev) => [...prev, { sender: "user", text: presetQuestion }]);
    setLoading(true);

    try {
      const aiResponse = await run(presetQuestion);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
      console.error(error);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-screen w-full border-none outline-none flex flex-col items-center justify-between p-4 text-left relative">
      {/* Background Gradient */}
      <div
        className="absolute bottom-0 left-0 w-full border-none outline-none from-[#9d9de7] to-[#e193a4]"
        style={{
          height: "150px",
          zIndex: -1,
          background: "linear-gradient(to right, #9d9de7,#e193a4)",
          maskImage: "linear-gradient(to bottom, transparent, blue 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, red 100%)",
        }}
      ></div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between gap-4 px-6 py-5.5 bg-white shadow-[0_2px_8px_0_#E4E4E4] text-[12px] z-10">
        <div className="flex gap-5">
          <button
            onClick={() => setActiveTab("copilot")}
            className={`font-semibold cursor-pointer ${
              activeTab === "copilot"
                ? "text-blue-600 border-b-1 border-blue-600"
                : "text-gray-500"
            } pb-1`}
          >
            AI Copilot
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`cursor-pointer ${
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            } pb-1`}
          >
            Details
          </button>
        </div>

        <button className="cursor-pointer">
          <img className="size-5" src="sidebar.png" alt="" />
        </button>
      </div>

      {/* Centered Fin Image and Intro */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center mt-[150px] mb-4">
          <div className="bg-black text-white p-2 rounded-lg mb-4">
            <img src="fin.png" alt="Fin AI Copilot" className="h-8 w-auto" />
          </div>
          <h2 className="text-lg font-semibold mb-1">Hi, I’m Fin AI Copilot</h2>
          <p className="text-gray-600 text-sm">
            Ask me anything about this conversation.
          </p>
        </div>
      )}

      {/* Chat Messages Area */}
      <div
        className="flex-1  w-full max-w-md mx-auto overflow-y-auto px-4 py-6 space-y-4"
        style={{ marginTop: "80px" }}
      >
        {messages.length === 0 && (
          <div className="text-gray-600 text-left"></div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <img
              src={msg.sender === "user" ? "user.png" : "fin.png"}
              alt={msg.sender}
              className="size-5 rounded-full"
            />
            {msg.sender === "ai" ? (
              <div
                className="max-w-[80%] px-4 py-2 rounded-lg text-white border-none"
                style={{
                  background: "linear-gradient(120deg, #9d9de7, #e193a4)",
                }}
              >
                {msg.text}
              </div>
            ) : (
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-white ">
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="max-w-[70%] px-4 py-2 rounded-lg bg-gray-200 text-gray-900 mr-auto text-left">
            Loading...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="w-full max-w-md mx-auto px-2">
        <div className="text-left mb-2">
          <button
            className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-full shadow hover:bg-gray-200"
            onClick={handlePresetQuestion}
            disabled={loading}
          >
            🧾 How do I get a refund?
          </button>
        </div>
        <div
          className="w-full bg-white border-none outline-none rounded-lg shadow-inner flex items-center gap-3
          focus-within:ring-2 focus-within:ring-[#625FC7] focus-within:ring-offset-0"
        >
          <textarea
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-grow bg-white px-4 py-3 border-none outline-none rounded-lg shadow-inner focus:outline-none resize-none min-h-[48px] max-h-[120px]"
          />
          <button
            onClick={handleSubmit}
            className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 transition-colors"
            disabled={loading}
            aria-label="Send"
          >
            <img
              src="uparrow.png"
              alt="Send"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopilotBar;
