import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // cleanup when component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // toggle dark/light mode
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div
      className={`md:min-w-[450px] flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-slate-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-500/20 transition"
        >
          {darkMode ? (
            <MdLightMode className="text-2xl" title="Light Mode" />
          ) : (
            <MdDarkMode className="text-2xl" title="Dark Mode" />
          )}
        </button>
      </div>

      {/* Chat Content */}
      {!selectedConversation ? (
        <NoChatSelected darkMode={darkMode} />
      ) : (
        <>
          {/* Header */}
          <div
            className={`px-4 py-2 mb-2 ${
              darkMode ? "bg-slate-700" : "bg-slate-300"
            }`}
          >
            <span className="label-text">To:</span>{" "}
            <span className="font-bold">{selectedConversation.fullName}</span>
          </div>
          <Messages darkMode={darkMode} />
          <MessageInput darkMode={darkMode} />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

// -------------------------
// No Chat Selected Component
// -------------------------
const NoChatSelected = ({ darkMode }) => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2 ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages
          className={`text-3xl md:text-6xl text-center ${
            darkMode ? "text-gray-200" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
};
