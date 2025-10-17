import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import { RiDeleteBin5Line } from "react-icons/ri";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { deleteMessage, loading } = useDeleteMessage();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300 text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  const handleDelete = () => {
    deleteMessage(message._id);
  };

  return (
    <div className={`chat ${chatClassName}`}>
      {/* Profile Picture */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="profile" src={profilePic} />
        </div>
      </div>

      {/* Message bubble */}
      <div className="relative">
        <div
          className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2 text-white transition-all duration-200`}
        >
          {message.message}
        </div>

        {/* 🗑️ Delete Button (visible only for sender) */}
        {fromMe && (
          <button
            onClick={handleDelete}
            disabled={loading}
            title="Delete message"
            className="absolute -top-3 -right-3 p-1 text-sm rounded-full bg-red-500/70 hover:bg-red-600 transition-colors text-white"
          >
            <RiDeleteBin5Line />
          </button>
        )}
      </div>

      {/* Time */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
