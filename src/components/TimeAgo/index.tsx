import React from 'react';
import { formatDistanceStrict } from 'date-fns';
import { useInstantService } from '../../providers';

interface Props {
    date: Date
}

export const TimeAgo : React.FC<Props> = ({ date }: Props) => {
    const instantService  = useInstantService();
    const now = instantService.now();
    const relativeDate = formatDistanceStrict(date, now, { addSuffix: true })


    return (
        <span>{relativeDate}</span>    
    );
}
