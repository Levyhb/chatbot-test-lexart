import React from "react";
import { messageInterface } from "@/types/messageInterface";
import { optionsInterface } from "@/types/optionsInterface";
import styles from "./chatMessages.module.css"

interface ChatMessagesProps {
  messages: messageInterface[];
  selectedOption: optionsInterface | null;
  proceedOptions: (link: string, option: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  selectedOption,
  proceedOptions,
}) => {
  return (
    <>
      {messages.map((e, index) => (
        <div
          className={e.user === "user" ? styles.message_own : styles.message}
          key={index}
        >
          {typeof e.message === "string" ? (
            <p>{e.message}</p>
          ) : (
            <div className={styles.bot_options}>
              <h4>Here some options to proceed</h4>
              {e.message.map((option, index) => (
                <button
                  key={index}
                  onClick={() => proceedOptions(option.link, option.option)}
                >
                  {option.option}
                </button>
              ))}
              {selectedOption && (
                <div
                  className={`${styles.selected_options} ${styles.message}`}
                >
                  <p>{selectedOption.instructions}</p>
                  <span>
                    More informations for{" "}
                    <a href={selectedOption.link} target="_blank">
                      {selectedOption.option}
                    </a>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
