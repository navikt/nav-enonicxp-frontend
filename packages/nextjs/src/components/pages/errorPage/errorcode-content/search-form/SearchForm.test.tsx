import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchForm } from './SearchForm';

const originalEnv = process.env.ENV;

afterEach(() => {
    process.env.ENV = originalEnv;
});

test.each([
    ['prod', 'https://www.nav.no/sok'],
    ['dev1', 'https://www.ansatt.dev.nav.no/sok'],
    ['dev2', 'https://www.ansatt.dev.nav.no/sok'],
    ['dev3', 'https://www.ansatt.dev.nav.no/sok'],
    ['localhost', 'https://www.ansatt.dev.nav.no/sok'],
] as const)('Search in %s submits to %s', (env, searchUrl) => {
    process.env.ENV = env;
    render(<SearchForm />);

    const form = screen.getByRole<HTMLFormElement>('search');
    expect(form).toHaveAttribute('action', searchUrl);
    expect(form).toHaveAttribute('method', 'get');

    fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: 'Stønad & hjelp' },
    });
    expect(Array.from(new FormData(form).entries())).toEqual([['ord', 'Stønad & hjelp']]);
});
