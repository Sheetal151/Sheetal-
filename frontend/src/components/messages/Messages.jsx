import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";

const Messages = ({ darkMode }) => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div
      className={`
        flex-1 overflow-y-auto px-2 py-2 sm:px-4 md:px-6
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
        max-h-[calc(100vh-110px)] rounded-t-xl w-full text-sm sm:text-base
        transition-colors duration-300
        ${darkMode ? "bg-slate-800 text-gray-200" : "bg-white text-black"}
      `}
    >
      {/* messages */}
      {!loading && messages.length > 0 && (
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <Message key={message._id} message={message} darkMode={darkMode} />
          ))}
          <div ref={lastMessageRef} />
        </div>
      )}

      {loading && (
        <div className="flex flex-col space-y-2">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} darkMode={darkMode} />
          ))}
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p
            className={`text-center font-medium px-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Start chatting — your messages will appear here 💬
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
