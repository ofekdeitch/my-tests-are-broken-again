import { screen, within } from '@testing-library/react';

export function getAllThreadElements(): HTMLElement[] {
    return screen.queryAllByTestId('thread');
}

export function getAllReplyElements(thread: HTMLElement): HTMLElement[] {
    return within(thread).queryAllByTestId('reply');
}