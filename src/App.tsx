import React, { useState, useEffect } from 'react';
import { MessageModel } from './models/message';
import { Message } from './components/Message';
import './App.css';
import { DataViewApi } from './apis/dataview';

function App() {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {

    const init = async () => {
      const result = await DataViewApi.get();
      setMessages(result);

    }

    init();
  }, [])

  return (
    <div>
      {messages.map(m => <Message key={m.id} message={m} />)}
    </div>
  );
}

export default App;
