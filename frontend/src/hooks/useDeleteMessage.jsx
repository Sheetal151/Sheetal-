import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation(); // ensure zustand store includes setMessages

  const deleteMessage = async (messageId) => {
    if (!messageId) return;
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        // Remove the deleted message from local UI
        setMessages(messages.filter((m) => m._id !== messageId));
      } else {
        console.error(data.error || "Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading };
};

export default useDeleteMessage;
