import React from 'react';
import { makeErrorProps } from '../types/content-types/error-props';
import { ErrorPage } from '../components/page-components/error-page/ErrorPage';

export const ErrorPage404 = () => {
    const props = makeErrorProps('', 'Fant ikke siden', 404);

    return <ErrorPage {...props} />;
};

export default ErrorPage404;
