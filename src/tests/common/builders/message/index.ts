import faker from 'faker';
import { MessageContract } from "../../../../apis/dataview/contracts/message";

export class MessageBuilder {
    value: Partial<MessageContract> = {};

    body(value: string): MessageBuilder {
        this.value.body = value;
        return this;
    }

    createdAt(value: Date): MessageBuilder {
        this.value.createdAt = value.toISOString();
        return this;
    }

    parentId(value: string): MessageBuilder {
        this.value.parentId = value;
        return this;
    }

    build(): MessageContract {
        return {
            id: this.value.id ?? faker.datatype.uuid(),
            parentId: this.value.parentId,
            body: this.value.body ?? faker.lorem.words(),
            createdAt: this.value.createdAt ?? faker.date.past().toISOString()
        };
    }

}
