import { screen } from '@testing-library/react';
import faker from 'faker';
import { TestDriver } from "../common/driver";

describe('Chat', () => {
    const hours = faker.datatype.number({ min: 2, max: 10 });
    const days = faker.datatype.number({ min: 2, max: 10 });

    describe(`When ${hours} hours pass since a message was sent`, () => {

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.startThread();
            driver.wait({ hours })

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it(`Should render "${hours} hours ago"`, () => {
            expect(screen.queryByText(`${hours} hours ago`)).toBeInTheDocument();
        })

    });

    describe(`When ${days} days pass since a message was sent`, () => {

        let driver: TestDriver;

        beforeEach(async () => {
            driver = new TestDriver();

            driver.startThread();
            driver.wait({ days })

            await driver.start();
        });

        afterEach(() => {
            driver.stop();
        });

        it(`Should render "${days} days ago"`, () => {
            expect(screen.queryByText(`${days} days ago`)).toBeInTheDocument();
        })

    });

});