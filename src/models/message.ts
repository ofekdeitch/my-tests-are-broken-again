export interface MessageModel {
    id: string;
    parentId?: string;
    body: string;
    createdAt: Date;
    children: MessageModel[];
}