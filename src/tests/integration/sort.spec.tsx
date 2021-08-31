import { screen, within } from '@testing-library/react';
import { TestDriver } from "../common/driver";

describe('Chat', () => {

    describe('A, B, C', () => {
        const messageA = 'Expressive';
        const messageB = 'Robust';
        const messageC = 'Maintainable';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.sendMessage(messageA);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageB);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageC);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should sort messages by time of creation', () => {
            const messages = screen.queryAllByTestId('message');
            expect(messages).toHaveLength(3);

            const [messageAElement, messageBElement, messageCElement] = messages;

            expect(within(messageAElement).queryByText(messageA)).toBeInTheDocument();
            expect(within(messageBElement).queryByText(messageB)).toBeInTheDocument();
            expect(within(messageCElement).queryByText(messageC)).toBeInTheDocument();
        });

    });

    describe('C, B, A', () => {
        const messageA = 'Expressive';
        const messageB = 'Robust';
        const messageC = 'Maintainable';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.sendMessage(messageC);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageB);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageA);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should sort messages by time of creation', () => {
            const messages = screen.queryAllByTestId('message');
            expect(messages).toHaveLength(3);

            const [messageCElement, messageBElement, messageAElement] = messages;

            expect(within(messageAElement).queryByText(messageA)).toBeInTheDocument();
            expect(within(messageBElement).queryByText(messageB)).toBeInTheDocument();
            expect(within(messageCElement).queryByText(messageC)).toBeInTheDocument();
        });

    });

    describe('B, C, A', () => {
        const messageA = 'Expressive';
        const messageB = 'Robust';
        const messageC = 'Maintainable';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.sendMessage(messageB);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageC);
            driver.wait({ seconds: 5 });

            driver.sendMessage(messageA);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should sort messages by time of creation', () => {
            const messages = screen.queryAllByTestId('message');
            expect(messages).toHaveLength(3);

            const [messageBElement, messageCElement, messageAElement] = messages;

            expect(within(messageAElement).queryByText(messageA)).toBeInTheDocument();
            expect(within(messageBElement).queryByText(messageB)).toBeInTheDocument();
            expect(within(messageCElement).queryByText(messageC)).toBeInTheDocument();
        });

    });

})