import { screen } from '@testing-library/react';
import { TestDriver } from "../common/driver";

describe('Chat', () => {

    describe('When 2 replies are added to a thread', () => {

        const firstReplyMessage = 'Expressive';
        const secondReplyMessage = 'Robust';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            const thread = driver.startThread();

            driver.replyToThread(thread, firstReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, secondReplyMessage);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('Renders both replies', () => {
            expect(screen.queryByText(firstReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(secondReplyMessage)).toBeInTheDocument();
        });

        it('Renders the amount of replies in the thread', () => {
            const expectedLabelText = '2 replies';
            expect(screen.queryByText(expectedLabelText)).toBeInTheDocument();
        });

    });

    describe('When 4 replies are added to a thread', () => {

        const firstReplyMessage = 'Expressive';
        const secondReplyMessage = 'Robust';
        const thirdReplyMessage = 'Maintainable';
        const forthReplyMessage = 'Yay!';
        const fifthReplyMessage = 'This is fun!';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            const thread = driver.startThread();

            driver.replyToThread(thread, firstReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, secondReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, thirdReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, forthReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, fifthReplyMessage);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('Renders only the last 2 replies', () => {
            expect(screen.queryByText(firstReplyMessage)).not.toBeInTheDocument();
            expect(screen.queryByText(secondReplyMessage)).not.toBeInTheDocument();
            expect(screen.queryByText(thirdReplyMessage)).not.toBeInTheDocument();

            expect(screen.queryByText(forthReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(fifthReplyMessage)).toBeInTheDocument();
        });

        it('Renders the amount of hidden replies', () => {
            const expectedLabelText = '3 more replies';
            expect(screen.queryByText(expectedLabelText)).toBeInTheDocument();
        });

    });

});
