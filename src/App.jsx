import ChatContainer from "./ChatContainer";
import CopilotBar from "./CopilotBar";

function App() {
  return (
    <div className="flex h-screen">
      {/* Left - Chat Container */}
      <div className="w-full h-full ">
        <ChatContainer />
      </div>

      {/* Right - Copilot Bar (hidden on screens <640px) */}
      <div className="hidden sm:block sm:w-1/2 h-full">
        <CopilotBar />
      </div>
    </div>
  );
}

export default App;
