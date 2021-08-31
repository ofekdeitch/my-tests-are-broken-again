import { setupServer, SetupServerApi } from 'msw/node';
import { rest } from 'msw';
import { Duration, add } from 'date-fns';
import _ from 'lodash';
import { DataViewContract } from '../../../apis/dataview/contracts/dataview';
import { MessageContract } from '../../../apis/dataview/contracts/message';
import { URLs } from '../../../apis/urls';
import { MessageBuilder } from '../builders/message';
import { renderApp, teardownApp } from './render';
import { wait } from '../../../common/wait';
import { act } from '@testing-library/react';
import { InstantService } from '../../../services/instant/glossary';

export class TestDriver {
    private now = new Date();
    private server?: SetupServerApi;
    private messages: MessageContract[] = [];


    public async start(): Promise<void> {
        const dataview = this.buildDataView();
        await this.mockServer(dataview);
        renderApp({ instantService: this.mockInstantService() });

        await this.waitForAppToBeReady();
    }

    private buildDataView(): DataViewContract {
        return {
            messages: _.shuffle(this.messages)
        };
    }

    public stop(): void {
        this.stopServer();
        teardownApp();
    }

    public sendMessage(text?: string) {
        let builder = (
            new MessageBuilder()
                .createdAt(this.now)
        );

        if (text) {
            builder = builder.body(text);
        }

        const message = builder.build();
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

    public wait(duration: Duration): void {
        this.now = add(this.now, duration);
    }

    private mockInstantService(): InstantService {
        const self = this;

        return {
            now(): Date {
                return self.now;
            }
        }
    }
}