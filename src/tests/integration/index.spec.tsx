import { screen } from '@testing-library/react';
import { TestDriver } from "../common/driver";

describe('Chat', () => {

    describe('When 3 threads are started', () => {
        const text1 = 'Expressive';
        const text2 = 'Robust';
        const text3 = 'Maintainable';

        let driver: TestDriver;

        beforeEach(async() => {
            driver = new TestDriver();

            driver.startThread(text1);
            driver.startThread(text2);
            driver.startThread(text3);

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('should render them', () => {
            expect(screen.queryByText(text1)).toBeInTheDocument();
            expect(screen.queryByText(text2)).toBeInTheDocument();
            expect(screen.queryByText(text3)).toBeInTheDocument();
        });

    });

})