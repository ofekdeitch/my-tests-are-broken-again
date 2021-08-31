import React from 'react';
import { MessageModel } from '../../models/message';

interface Props {
    message: MessageModel;
}

export const Message: React.FC<Props> = ({ message }: Props) => {
    return (
        <div>{message.body}</div>
    );
}
