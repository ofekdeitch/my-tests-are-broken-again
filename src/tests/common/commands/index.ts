import { fireEvent, within } from "@testing-library/react";

export async function expandThread(thread: HTMLElement): Promise<void> {
    const button = await within(thread).findByText(/more (replies|reply)/);
    fireEvent.click(button);
}
