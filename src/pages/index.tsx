import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import optusIcon from "../../public/optus-icon.png";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MicIcon from "@mui/icons-material/Mic";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { processQuestion } from "@/utils/processQuestions";
import { messageInterface } from "@/types/messageInterface";
import { optionsInterface } from "@/types/optionsInterface";
import ChatMessages from "@/components/Messages/ChatMessages";
import { saveConversation } from "@/utils/conversationStorage";

const initialBotMessage: messageInterface = {
  user: "bot",
  message:
    "Welcome! You can start the conversation with 'Hello', 'Get started', or 'I want'.",
};

const mockUser = {
  username: "john",
  password: "123456",
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageInterface[]>([
    initialBotMessage,
  ]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<optionsInterface | null>(
    null
  );
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const questionRegex = /\b(hello|get started|i want)\b/i;

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const verifyUser = () => {
    const currentStep = verificationStep;
    if (currentStep === 0) {
      if (questionRegex.test(message)) {
        const verificationMessage: messageInterface = {
          user: "bot",
          message: "Please enter your username:",
        };
        setMessages((prevMessages) => [...prevMessages, verificationMessage]);
        setVerificationStep(currentStep + 1);
      } else {
        const verificationErrorMessage: messageInterface = {
          user: "bot",
          message:
            "To get started, please initiate with 'Hello', 'Get started', or 'I want'.",
        };
        setMessages((prevMessages) => [
          ...prevMessages,
          verificationErrorMessage,
        ]);
      }
    } else if (currentStep === 1) {
      if (message === mockUser.username) {
        const passwordVerificationMessage: messageInterface = {
          user: "bot",
          message: "Please enter your password:",
        };
        setMessages((prevMessages) => [
          ...prevMessages,
          passwordVerificationMessage,
        ]);
        setVerificationStep(currentStep + 1);
      } else {
        const usernameErrorMessage: messageInterface = {
          user: "bot",
          message: "Username is invalid. Please try again.",
        };
        setMessages((prevMessages) => [...prevMessages, usernameErrorMessage]);
      }
    } else if (currentStep === 2) {
      if (message === mockUser.password) {
        setIsUserVerified(true);
        const welcomeMessage: messageInterface = {
          user: "bot",
          message: `Welcome back! You can ask about 'loan' or 'conversations',
            and you can end a conversation with
            'goodbye'. How can I assist you today?`,
        };
        setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
      } else {
        const passwordErrorMessage: messageInterface = {
          user: "bot",
          message: "Invalid password. Please try again.",
        };
        setMessages((prevMessages) => [...prevMessages, passwordErrorMessage]);
        setVerificationStep(1);
      }
    }
    setMessage("");
  };

  const sendMessage = () => {
    if (!isUserVerified) {
      verifyUser();
    } else {
      if (message.toLowerCase() === "goodbye") {
        const botMessage = {
          user: "bot",
          message:
            "Thank you for the conversation! Your conversation has been saved.",
        };

        saveConversation(messages, mockUser.username);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const messageData = {
          user: "user",
          message,
        };
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage("");
        const botResponse = processQuestion(message);
        if (botResponse) {
          const botMessage = {
            user: "bot",
            message: botResponse,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      }
    }
  };

  const proceedOptions = (link: string, option: string) => {
    const instructions = processQuestion(option);
    setSelectedOption({ link, option, instructions: instructions as string });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.chatbot}>
        <div className={styles.chatbot_container}>
          <div className={styles.chat_header}>
            <ArrowBackIcon />
            <div className={styles.chat_header_user}>
              <Image src={optusIcon} alt="" />
              <div className={styles.chat_header_user_info}>
                <h2>Optus</h2>
                <span>Tipically replies in a day</span>
              </div>
            </div>
            <div className={styles.verify_user}>
              <CheckIcon />
              <ArrowDropDownIcon />
            </div>
            <InfoIcon />
          </div>

          <div className={styles.chat_user}>
            <Image src={optusIcon} alt="" />
            <div className={styles.chat_user_info}>
              <h2>
                Optus <CheckIcon />
              </h2>
              <span>
                419k peopple like this including Maha Mourad and 35 friends
              </span>
              <span>Company</span>
            </div>
          </div>

          <div className={styles.chat_messages} ref={messagesContainerRef}>
            <span className={styles.chat_time}>11:05 AM</span>
            <ChatMessages
              messages={messages}
              selectedOption={selectedOption}
              proceedOptions={proceedOptions}
            />
          </div>

          <form className={styles.chat_type_messages} onSubmit={sendMessage}>
            <AddIcon className={styles.add_icon} />
            <CameraAltIcon />
            <InsertPhotoIcon />
            <MicIcon />
            <div className={styles.input_message}>
              <input
                type="text"
                placeholder="Aa"
                className={styles.input_message}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <SentimentSatisfiedAltIcon />
            </div>
            <button
              className={styles.send_message}
              onClick={sendMessage}
              disabled={message.length === 0}
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
