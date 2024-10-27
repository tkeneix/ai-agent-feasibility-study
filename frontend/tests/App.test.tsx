import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
    it('renders movie booking app', () => {
        render(<App />);
        expect(screen.getByPlaceholderText('メッセージを入力...')).toBeDefined();
    });
});