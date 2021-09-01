import _ from 'lodash';
import { Dictionary } from '../../models/dictionary';
import { MessageModel } from "../../models/message";

export class ThreadMaker {
    private flatMessages: MessageModel[];

    private parents: Dictionary<MessageModel> = {};
    private children: Dictionary<MessageModel[]> = {};

    constructor(flatMessages: MessageModel[]) {
        this.flatMessages = flatMessages;
    }

    public make(): MessageModel[] {
        this.populateDictionaries();
        return this.buildThreads();
    }

    private buildThreads() {
        const threads = Object.values(this.parents)
            .map(m => {
                const replies: MessageModel[] = this.getChildren(m);

                return {
                    ...m,
                    children: _.sortBy(replies, m => m.createdAt)
                };
            });

        return _.sortBy(threads, m => m.createdAt);
    }

    private populateDictionaries() {
        for (const m of this.flatMessages) {
            if (isThreadMessage(m)) {
                this.parents[m.id] = m;
            } else {
                this.addReply(m);

            }
        }
    }

    private getChildren(parent: MessageModel): MessageModel[] {
        return this.children[parent.id] || [];
    }

    private addReply(m: MessageModel) {
        const existingReplies = this.children[m.parentId!];

        if (_.isNil(existingReplies)) {
            this.children[m.parentId!] = [m];
        } else {
            this.children[m.parentId!].push(m);
        }
    }
}


function isThreadMessage(message: MessageModel): boolean {
    return _.isNil(message.parentId);
}