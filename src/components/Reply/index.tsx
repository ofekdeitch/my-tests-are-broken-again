import React from 'react';
import { MessageModel } from '../../models/message';
import { TimeAgo } from '../TimeAgo';

interface Props {
    message: MessageModel;
}

export const Reply: React.FC<Props> = ({ message }: Props) => {
    return (
        <div data-testid="reply">
            <p>{message.body}</p>
            <TimeAgo date={message.createdAt} />
        </div>
    );
}
