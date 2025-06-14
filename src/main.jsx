import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GeminiContextProvider from "./GeminiContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GeminiContextProvider>
      <App />
    </GeminiContextProvider>
  </StrictMode>
);
