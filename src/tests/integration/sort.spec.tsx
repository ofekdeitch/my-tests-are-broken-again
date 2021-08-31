import { screen, within } from '@testing-library/react';
import { TestDriver } from "../common/driver";

describe('Chat', () => {

    describe('When the order of creation is A, B, C', () => {
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

        it('should render 3 messsages', () => {
            const messages = getAllMessageElements();
            expect(messages).toHaveLength(3);
        });

        it('the first message should be A', () => {
            const messageElements = getAllMessageElements();
            const firstMessageElement = messageElements[0];

            const expectedContent = messageA;
            expect(within(firstMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second message should be B', () => {
            const messageElements = getAllMessageElements();
            const secondMessageElement = messageElements[1];

            const expectedContent = messageB;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third message should be C', () => {
            const messageElements = getAllMessageElements();
            const thirdMessageElement = messageElements[2];

            const expectedContent = messageC;
            expect(within(thirdMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

    });

    describe('When the order of creation is C, B, A', () => {
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

        it('should render 3 messsages', () => {
            const messages = getAllMessageElements();
            expect(messages).toHaveLength(3);
        });

        it('the first message should be C', () => {
            const messageElements = getAllMessageElements();
            const firstMessageElement = messageElements[0];

            const expectedContent = messageC;
            expect(within(firstMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second message should be B', () => {
            const messageElements = getAllMessageElements();
            const secondMessageElement = messageElements[1];

            const expectedContent = messageB;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third message should be A', () => {
            const messageElements = getAllMessageElements();
            const thirdMessageElement = messageElements[2];

            const expectedContent = messageA;
            expect(within(thirdMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

    });

    describe('When the order of creation is B, C, A', () => {
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

        it('should render 3 messsages', () => {
            const messages = getAllMessageElements();
            expect(messages).toHaveLength(3);
        });

        it('the first message should be B', () => {
            const messageElements = getAllMessageElements();
            const firstMessageElement = messageElements[0];

            const expectedContent = messageB;
            expect(within(firstMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second message should be C', () => {
            const messageElements = getAllMessageElements();
            const secondMessageElement = messageElements[1];

            const expectedContent = messageC;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third message should be A', () => {
            const messageElements = getAllMessageElements();
            const thirdMessageElement = messageElements[2];

            const expectedContent = messageA;
            expect(within(thirdMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

    });

})

function getAllMessageElements() {
    return screen.queryAllByTestId('message');
}
