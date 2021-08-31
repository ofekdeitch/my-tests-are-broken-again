import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App, { Props } from '../../../App';

export function renderApp(props: Props) {
    render(<App {...props} />);
}

export function teardownApp() {
    cleanup();
}