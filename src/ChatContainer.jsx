import { useContext, useState, useEffect } from "react";
import { GeminiContext } from "./GeminiContext";

const ChatContainer = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { resultData, onSent, loading } = useContext(GeminiContext);


  const [lastAskedQuestion, setLastAskedQuestion] = useState("");

 
  const handleSend = () => {
    if (question.trim()) {
      onSent(question);
      setLastAskedQuestion(question);
      setQuestion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  useEffect(() => {
    if (resultData && lastAskedQuestion) {
      setChatHistory((prev) => [
        ...prev,
        {
          question: lastAskedQuestion,
          response: resultData,
        },
      ]);
      setLastAskedQuestion(""); 
    }
  }, [resultData]);

  return (
    <div className="w-full h-full flex-col flex">
      {/* Header */}
      <div className="bg-white shadow-[0_2px_8px_0_#E4E4E4] p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-center font-bold z-10 w-full">
        <h1 className="text-[15px] sm:text-[18px] w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
          Your inbox
        </h1>
        <h1 className="text-[16px] sm:text-[20px] hidden sm:block">
          Luis Easton
        </h1>
        <div className="flex gap-1 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <button className="bg-[#E4E4E4] cursor-pointer rounded-md px-3 py-1 text-xs sm:text-sm">
            ...
          </button>
          <button className="bg-[#E4E4E4] cursor-pointer rounded-md p-1 sm:p-2">
            <img
              className="w-7 h-7 sm:w-6 sm:h-6 "
              src="moon.png"
              alt="Dark mode"
            />
          </button>
          <button className="cursor-pointer rounded-md bg-black text-white px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-base">
            Close
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%] lg:min-w-[250px] lg:max-w-[350px] p-4 overflow-auto bg-gray-50 border-r sm:h-full h-[32%] border-gray-200 flex flex-col">
          <div className="mb-4 flex gap-1">
            <button className="cursor-pointer font-bold text-[13px] px-3 rounded flex items-center gap-1 hover:bg-gray-300">
              5 open
            </button>
            <button className="cursor-pointer font-bold text-[13px] px-3 rounded flex items-center gap-1 hover:bg-gray-300">
              working location
            </button>
          </div>
          <div>
            <div className="mt-4 cursor-pointer hover:bg-[#D3DCF4] p-2 rounded-lg">
              <div className="flex gap-3">
                <img src="userL.png" className="rounded-full w-8  p-1" />
                <h1 className="font-bold text-sm">Luis-Github</h1>
              </div>
              <p className="ml-10 text-sm">Hey i have a question ...</p>
            </div>
            <div className="mt-2 cursor-pointer hover:bg-[#D3DCF4] p-2 rounded-lg">
              <div className="flex gap-3">
                <img src="userI.png" className="rounded-full w-8  p-1" />
                <h1 className="font-bold text-sm">Ivan-Nike</h1>
              </div>
              <p className="ml-10 text-sm">Hey there i have que ...</p>
            </div>
            <div className="mt-2 cursor-pointer hover:bg-[#D3DCF4] p-2 rounded-lg">
              <div className="flex gap-3">
                <img src="userL.png" className="rounded-full w-8 p-1" />
                <h1 className="font-bold text-sm">Lead from New York</h1>
              </div>
              <p className="ml-10 text-sm">Good morning let me ...</p>
            </div>
            <div className="mt-2 cursor-pointer hover:bg-[#D3DCF4] p-2 rounded-lg">
              <div className="flex gap-3">
                <img src="userB.png" className="rounded-full w-8  p-1" />
                <h1 className="font-bold text-sm">Booking Api Problems</h1>
              </div>
              <p className="ml-10 text-sm">Bug Problem</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="w-[100%] lg:w-[75%] flex flex-col bg-white relative">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-40 max-h-[calc(100vh-250px)]">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <img className="size-4 rounded-sm" src="fin.png" alt="" />
                <div className="bg-gray-100 p-3 rounded w-fit max-w-[70%] text-sm">
                  hi I am Fin , how can i help you
                </div>
              </div>

              {chatHistory.map((chat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-end gap-2">
                    <img className="size-4 rounded-sm" src="fin.png" alt="" />
                    <div className="bg-gray-100 p-3 rounded w-fit max-w-[70%] text-sm">
                      {chat.question}
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="bg-[#D3DCF4] p-3 rounded w-fit self-end ml-auto max-w-[70%] text-sm">
                      {chat.response}
                    </div>
                    <img className="size-4 rounded-lg" src="user.png" alt="" />
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="bg-[#D3DCF4] p-3 rounded w-fit self-end ml-auto max-w-[70%] text-sm">
                    Thinking...
                  </div>
                  <img className="size-4 rounded-lg" src="user.png" alt="" />
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="fixed lg:absolute bottom-4 left-0 lg:left-4 right-0 lg:right-4 mx-4 lg:mx-0 rounded-lg bg-white shadow-[0px_0px_10px_7px_#F3F4F6] p-2 w-[calc(100%-20%)] sm:w-[45vw] md:w-[40vw] lg:w-[calc(100%-32px)]">
            <button className="flex gap-2 items-center mb-2 cursor-pointer">
              <img className="size-4" src="chat.png" alt="" />
              <h1 className="font-bold text-sm flex items-center gap-2">
                Chat <img className="size-3" src="arrow.png" alt="" />
              </h1>
            </button>
            <textarea
              placeholder="Use Xk for shortcuts"
              className="border-none outline-none w-full h-7 resize-none text-sm"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <button className="p-1 cursor-pointer">
                  <img className="w-4" src="flash.png" alt="" />
                </button>
                <button className="p-1 cursor-pointer">
                  <img className="w-4" src="bookmark.png" alt="" />
                </button>
                <button className="p-1 cursor-pointer">
                  <img className="w-4" src="laugh.png" alt="" />
                </button>
              </div>
              <button
                onClick={handleSend}
                className="p-2 flex items-center gap-2 cursor-pointer rounded-lg bg-[#E4E4E4] text-sm"
              >
                Send <img className="w-4" src="arrow.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
