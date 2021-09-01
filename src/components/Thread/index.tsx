import React from 'react';
import { MessageModel } from '../../models/message';
import { TimeAgo } from '../TimeAgo';
import { Reply } from '../Reply';

interface Props {
    message: MessageModel;
}

export const Thread: React.FC<Props> = ({ message }: Props) => {
    return (
        <div data-testid="thread">
            <p>{message.body}</p>
            <TimeAgo date={message.createdAt} />

            <div>
                {
                    message.children.map(reply => <Reply key={reply.id} message={reply} />)
                }
            </div>
        </div>
    );
}
