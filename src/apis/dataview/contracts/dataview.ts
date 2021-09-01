import { ThreadMaker } from "../../../common/makeThreads";
import { MessageModel } from "../../../models/message";
import { MessageContract, toMessageModel } from "./message";

export interface DataViewContract {
    messages: MessageContract[];
}

export function toDataViewResult(contract: DataViewContract): MessageModel[] {
    const flatMessages = contract.messages.map(toMessageModel);
    return new ThreadMaker(flatMessages).make();
}