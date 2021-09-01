import { screen, within } from '@testing-library/react';
import { expandThread } from '../common/commands';
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

        it('Replies are appended to their thread', async() => {

            const threads = getAllThreadElements();
            expect(threads).toHaveLength(1);
            const threadElement = threads[0];

            await expandThread(threadElement);

            expect(screen.queryByText(threadMessage)).toBeInTheDocument();
            expect(screen.queryByText(firstReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(secondReplyMessage)).toBeInTheDocument();
            expect(screen.queryByText(thirdReplyMessage)).toBeInTheDocument();


            const replies = getAllReplyElements(threadElement);
            expect(replies).toHaveLength(3);
        });

        it('Replies are sorted by creation time', async() => {
            const threads = getAllThreadElements();
            const threadElement = threads[0];
            await expandThread(threadElement);

            const replies = getAllReplyElements(threadElement);
            expect(replies).toHaveLength(3);

            const [firstReply, secondReply, thirdReply] = replies;

            expect(within(firstReply).queryByText(firstReplyMessage)).toBeInTheDocument();
            expect(within(secondReply).queryByText(secondReplyMessage)).toBeInTheDocument();
            expect(within(thirdReply).queryByText(thirdReplyMessage)).toBeInTheDocument();
        });

    });

})