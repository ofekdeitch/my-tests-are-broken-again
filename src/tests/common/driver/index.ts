import { setupServer, SetupServerApi } from 'msw/node';
import { rest } from 'msw';
import { DataViewContract } from '../../../apis/dataview/contracts/dataview';

import { MessageContract } from '../../../apis/dataview/contracts/message';
import { URLs } from '../../../apis/urls';
import { MessageBuilder } from '../builders/message';
import { renderApp, teardownApp } from './render';
import { wait } from '../../../common/wait';
import { act } from '@testing-library/react';

export class TestDriver {
    private server?: SetupServerApi;
    private messages: MessageContract[] = [];

    public async start(): Promise<void> {
        const dataview: DataViewContract = {
            messages: this.messages
        };

        await this.mockServer(dataview);
        renderApp();

        await this.waitForAppToBeReady();
    }

    public stop(): void {
        this.stopServer();
        teardownApp();
    }

    public sendMessage(text: string) {
        const message = (
            new MessageBuilder()
                .body(text)
                .build()
        )

        this.messages.push(message);
    }

    private async mockServer(dataview: DataViewContract): Promise<void> {
        this.server = setupServer(
            rest.get(URLs.getDataView(), (_req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json(dataview)
                );
            })
        );

        await this.server.listen();
    }

    private stopServer(): void {
        this.server?.close();
    }

    private async waitForAppToBeReady(): Promise<void> {
        await act(async () => {
            await wait(1000);
        })
    }

}