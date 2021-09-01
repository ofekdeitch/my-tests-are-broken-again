import { MessageModel } from "../../../models/message";
import { RawDate, toDate } from "./date";

export interface MessageContract {
    id: string;
    parentId?: string;
    body: string;
    createdAt: RawDate;
}

export function toMessageModel(contract: MessageContract): MessageModel {
    return {
        id: contract.id,
        parentId: contract.parentId,
        body: contract.body,
        createdAt: toDate(contract.createdAt),
        children: []
    }
}
