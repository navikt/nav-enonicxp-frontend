import React from 'react';
import { makeErrorProps } from '../types/content/error-props';
import { ErrorPage } from '../components/pages/error-page/ErrorPage';

export const ErrorPage404 = () => {
    const props = makeErrorProps('', 'Fant ikke siden', 404);

    return <ErrorPage {...props} />;
};

export default ErrorPage404;
