import { MessageModel } from "../../../models/message";
import { RawDate, toDate } from "./date";

export interface MessageContract {
    id: string;
    body: string;
    createdAt?: RawDate
}

export function toMessageModel(contract: MessageContract): MessageModel {
    return {
        id: contract.id,
        body: contract.body,
        createdAt: toDate(contract.createdAt)
    }
}
