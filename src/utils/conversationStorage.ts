import { messageInterface } from "@/types/messageInterface";

export const saveConversation = (messages:messageInterface[], user: string): void => {
  const existingConversations = localStorage.getItem("conversations");
  let conversations = [];
  if (existingConversations) {
    conversations = JSON.parse(existingConversations);
  }

  const conversationSaved = {
    conversation: `Conversation user ${user} - ${new Date().toLocaleString()}`,
    messages,
  };

  conversations.push(conversationSaved);
  localStorage.setItem("conversations", JSON.stringify(conversations));
};
