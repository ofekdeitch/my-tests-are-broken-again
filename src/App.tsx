import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { MessageModel } from './models/message';
import { Message } from './components/Message';
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
      setMessages(_.sortBy(result, m => m.createdAt));

    }

    init();
  }, [])

  return (
    <Providers instantService={instantService}>
      <div>
        {messages.map(m => <Message key={m.id} message={m} />)}
      </div>
    </Providers>
  );
}

export default App;
