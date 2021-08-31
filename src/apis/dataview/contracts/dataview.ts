import { MessageModel } from "../../../models/message";
import { MessageContract, toMessageModel } from "./message";

export interface DataViewContract {
    messages: MessageContract[];
}

export function toDataViewResult(contract: DataViewContract): MessageModel[] {
    return contract.messages.map(toMessageModel);
}