import { screen, within } from '@testing-library/react';
import _ from 'lodash';
import { TestDriver } from "../common/driver";
import { getAllThreadElements } from '../common/queries';

describe('Chat', () => {

    describe('When the order of creation is A, B, C', () => {

        const threadBodies = _.shuffle([
            'Expressive',
            'Robust',
            'Maintainable',
            'Yay!',
            'This is fun!'
        ]);

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            for (const body of threadBodies) {
                driver.startThread(body);
                driver.wait({ seconds: 5 });
            }

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it('All threads are rendered', () => {
            const threadElements = getAllThreadElements();
            expect(threadElements).toHaveLength(threadBodies.length);

            for (const body of threadBodies) {
                expect(screen.queryByText(body)).toBeInTheDocument();
            }
        });

        it('Threads are sorted by creation time', () => {
            const threadElements = getAllThreadElements();

            threadElements.forEach((threadElement, i) => {
                const expectedText = threadBodies[i];
                expect(within(threadElement).queryByText(expectedText)).toBeInTheDocument();
            });
        });

    });

});
