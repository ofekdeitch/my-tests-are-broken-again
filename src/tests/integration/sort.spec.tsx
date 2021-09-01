import { within } from '@testing-library/react';
import { TestDriver } from "../common/driver";
import { getAllThreadElements } from '../common/queries';

describe('Chat', () => {

    describe('When the order of creation is A, B, C', () => {
        const messageA = 'Expressive';
        const messageB = 'Robust';
        const messageC = 'Maintainable';

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.startThread(messageA);
            driver.wait({ seconds: 5 });

            driver.startThread(messageB);
            driver.wait({ seconds: 5 });

            driver.startThread(messageC);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should render 3 threads', () => {
            const threads = getAllThreadElements();
            expect(threads).toHaveLength(3);
        });

        it('the first thread should be A', () => {
            const threadElements = getAllThreadElements();
            const firstMessageElement = threadElements[0];

            const expectedContent = messageA;
            expect(within(firstMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second thread should be B', () => {
            const threadElements = getAllThreadElements();
            const secondMessageElement = threadElements[1];

            const expectedContent = messageB;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third thread should be C', () => {
            const threadElements = getAllThreadElements();
            const thirdMessageElement = threadElements[2];

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

            driver.startThread(messageC);
            driver.wait({ seconds: 5 });

            driver.startThread(messageB);
            driver.wait({ seconds: 5 });

            driver.startThread(messageA);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should render 3 threads', () => {
            const threads = getAllThreadElements();
            expect(threads).toHaveLength(3);
        });

        it('the first thread should be C', () => {
            const threadElements = getAllThreadElements();
            const firstMessageElement = threadElements[0];

            const expectedContent = messageC;
            expect(within(firstMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second thread should be B', () => {
            const threadElements = getAllThreadElements();
            const secondMessageElement = threadElements[1];

            const expectedContent = messageB;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third thread should be A', () => {
            const threadElements = getAllThreadElements();
            const thirdMessageElement = threadElements[2];

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

            driver.startThread(messageB);
            driver.wait({ seconds: 5 });

            driver.startThread(messageC);
            driver.wait({ seconds: 5 });

            driver.startThread(messageA);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should render 3 threads', () => {
            const threads = getAllThreadElements();
            expect(threads).toHaveLength(3);
        });

        it('the first thread should be B', () => {
            const threadElements = getAllThreadElements();
            const firstThreadElement = threadElements[0];

            const expectedContent = messageB;
            expect(within(firstThreadElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the second thread should be C', () => {
            const threadElements = getAllThreadElements();
            const secondMessageElement = threadElements[1];

            const expectedContent = messageC;
            expect(within(secondMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

        it('the third thread should be A', () => {
            const threadElements = getAllThreadElements();
            const thirdMessageElement = threadElements[2];

            const expectedContent = messageA;
            expect(within(thirdMessageElement).queryByText(expectedContent)).toBeInTheDocument();
        });

    });

});
