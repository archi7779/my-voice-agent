export async function getDeepgramKey(): Promise<string> {
    try{
 const response = await fetch(`${import.meta.env.VITE_API_URL}/voice/sptAuth`);
  if (!response.ok) throw new Error('Не удалось получить ключ');
  const data = await response.json();
  return data.key;
    } catch (err) {
          if (err instanceof TypeError) {
      throw new Error('Сервер недоступен. Проверьте подключение.');
    }
    
    throw err;
  }
    }
