import { Message } from "../model/types";
import styles from "./MessageBubble.module.css";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`${styles.message} ${
        message.sender === "user" ? styles.user : styles.bot
      }`}
    >
      {message.text}
    </div>
  );
}
