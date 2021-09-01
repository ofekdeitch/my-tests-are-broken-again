import React, { useState, useEffect } from 'react';
import { MessageModel } from './models/message';
import { Thread } from './components/Thread';
import { DataViewApi } from './apis/dataview';
import { Providers } from './providers';
import { InstantService } from './services/instant/glossary';

export interface Props {
  instantService: InstantService;
}

export const App: React.FC<Props> = ({ instantService }: Props) => {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {

    const init = async () => {
      const result = await DataViewApi.get();
      setMessages(result);
    }

    init();
  }, [])

  return (
    <Providers instantService={instantService}>
      <div>
        {messages.map(m => <Thread key={m.id} message={m} />)}
      </div>
    </Providers>
  );
}

export default App;
