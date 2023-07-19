import { conversationInterface } from '@/types/conversationInterface';
import { getSavedConversations } from '@/utils/conversationStorage';
import React, { useEffect, useState } from 'react';
import styles from "./conversation.module.css";
import Papa from "papaparse";

export default function Conversation() {
  const [savedConversations, setSavedConversations] = useState<conversationInterface[]>();

  useEffect(() => {
    const getConversations = async () => {
      const conversations = await getSavedConversations();
      setSavedConversations(conversations);
    };
    getConversations();
  }, []);

  const downloadCSV = (conversation: conversationInterface) => {
    const csvData = [
      [conversation.conversation, JSON.stringify(conversation.messages)]
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "saved_conversation.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.conversation}>
      <h1>Download Saved Conversations</h1>
      {savedConversations && savedConversations.map((conversation, index) => (
        <div key={index} className={styles.download_conversation}>
          <button onClick={() => downloadCSV(conversation)} >{conversation.conversation}</button>
        </div>
      ))}
    </div>
  );
}
