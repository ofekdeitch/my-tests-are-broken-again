import { screen, within } from '@testing-library/react';
import { TestDriver } from "../common/driver";
import { getAllReplyElements, getAllThreadElements } from '../common/queries';

describe('Chat', () => {

    describe('When 3 replies are made on a thread', () => {
        const threadMessage = 'Expressive';
        const firstReplyMessage = 'Robust';
        const secondReplyMessage = 'Maintainable';
        const thirdReplyMessage = 'Yay!';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            const thread = driver.startThread(threadMessage);

            driver.replyToThread(thread, firstReplyMessage);
            driver.wait({ seconds: 5 })

            driver.replyToThread(thread, secondReplyMessage);
            driver.wait({ seconds: 5 });

            driver.replyToThread(thread, thirdReplyMessage);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('Replies are appended to their thread', () => {
            expect(screen.queryByText(threadMessage)).toBeInTheDocument();
            expect(screen.queryByText(firstReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(secondReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(thirdReplyMessage)).toBeInTheDocument();

            const threads = getAllThreadElements();
            expect(threads).toHaveLength(1);

            const replies = getAllReplyElements(threads[0]);
            expect(replies).toHaveLength(3);
        });

        it('Replies are sorted by creation time', () => {
            const threads = getAllThreadElements();

            const replies = getAllReplyElements(threads[0]);
            expect(replies).toHaveLength(3);

            const [firstReply, secondReply, thirdReply] = replies;

            expect(within(firstReply).queryByText(firstReplyMessage)).toBeInTheDocument();
            expect(within(secondReply).queryByText(secondReplyMessage)).toBeInTheDocument();
            expect(within(thirdReply).queryByText(thirdReplyMessage)).toBeInTheDocument();
        });

    });

})