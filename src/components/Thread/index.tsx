import React, { useState } from 'react';
import _ from 'lodash';
import { MessageModel } from '../../models/message';
import { TimeAgo } from '../TimeAgo';
import { Reply } from '../Reply';

interface Props {
    message: MessageModel;
}

const COLLAPSED_MESSAGE_AMOUNT = 2;

export const Thread: React.FC<Props> = ({ message }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
    const shouldCollapse = message.children.length > COLLAPSED_MESSAGE_AMOUNT;
    const canExpand = shouldCollapse && collapsed;
    const replies = !collapsed ? message.children : _.takeRight(message.children, COLLAPSED_MESSAGE_AMOUNT);
    const numberOfHiddenReplies = message.children.length - COLLAPSED_MESSAGE_AMOUNT;

    const expandThread = () => {
        setCollapsed(false);
    }

    return (
        <div data-testid="thread">
            <p>{message.body}</p>
            <TimeAgo date={message.createdAt} />
            {
                canExpand ? (
                    <button onClick={expandThread}>{numberOfHiddenReplies} more replies</button>
                ) : (
                    <span>{message.children.length} replies</span>
                )
            }
            <div>
                {
                    replies.map(reply => <Reply key={reply.id} message={reply} />)
                }
            </div>
        </div>
    );
}
