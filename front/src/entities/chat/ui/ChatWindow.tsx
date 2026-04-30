import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "../model/types";
import { MessageBubble } from "./MessageBubble";
import { useDeepgramKey } from "../../../shared/api/hooks/useDeepgramKey";
import { startVoiceRecording, stopVoiceRecording } from "../../../shared/api";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const { refetch: getKey, isLoading:isKeyLoading } = useDeepgramKey();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Здравствуйте! Чем я могу вам помочь?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Авто-высота textarea + прокрутка вниз
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const maxHeight = window.innerHeight * 0.3; // 30dvh
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
      // Прокручиваем вниз, чтобы последние сообщения были видны
      scrollToBottom();
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCancel = () => {
    setInput("");
  };

  const handleVoice = async () => {
    if (isRecording) {
      stopVoiceRecording();
      setIsRecording(false);
      return;
    }

    const { data: freshKey, isError, error } = await getKey();
    if (isError) {
      const ErrorMessage: Message = {
        id: Date.now(),
        text: error?.message || "Ошибка получения ключа",
        sender: "bot",
      };
      setMessages((prev) => [...prev, ErrorMessage]);
      setIsRecording(false);
      return;
    }

    if (freshKey) {
      try{
      setIsRecording(true);
      await startVoiceRecording(freshKey,setInput);
      }
      catch(err){
        const ErrorMessage: Message = {
        id: Date.now(),
         text: err instanceof Error ? err.message : 'Ошибка распознавания речи',
        sender: "bot",
      };
      setMessages((prev) => [...prev, ErrorMessage]);
      setIsRecording(false);
      }
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <h2>🎙️ Голосовой ассистент</h2>
        <p>Задайте вопрос голосом или текстом</p>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <div className={styles.emptyText}>Начните диалог</div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          ref={textareaRef}
          className={styles.textInput}
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.btnCancel}`}
            onClick={handleCancel}
          >
            ✕ Отменить
          </button>
          <button
            className={`${styles.btn} ${
              isRecording ? styles.btnVoiceRecording : styles.btnVoice
            }`}
            onClick={handleVoice}
          > 
            {isKeyLoading ?   "Подготовка..." : isRecording ? "⏹ Остановить" : "🎤 Записать"}
            
          </button>
          <button
            className={`${styles.btn} ${styles.btnSend}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            ➤ Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
