import { ChatWindow } from "../../entities/chat";
import styles from "./ChatPage.module.css";

function ChatPage() {
  return (
    <div className={styles.container}>
      <ChatWindow />
    </div>
  );
}

export default ChatPage;
