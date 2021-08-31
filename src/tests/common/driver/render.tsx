import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../../../App';

export function renderApp() {
    render(<App />);
}

export function teardownApp() {
    cleanup();
}