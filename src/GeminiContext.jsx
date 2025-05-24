import { createContext, useState } from "react";
import run from "./Gemini.js"; // Gemini API helper

export const GeminiContext = createContext();

const GeminiContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    const userPrompt = prompt || input;
    if (!userPrompt.trim()) return;

    setLoading(true);
    setInput("");
    setResultData("");

    try {
      const response = await run(userPrompt);
      setResultData(response);
    } catch (error) {
      setResultData("Something went wrong while getting the response.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setInput("");
    setResultData("");
    setLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    resultData,
    loading,
    onSent,
    newChat,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
