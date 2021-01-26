import React from 'react';
import { makeErrorProps } from '../utils/make-error-props';
import PageBase from '../components/PageBase';

export const ErrorPage404 = () => {
    const props = makeErrorProps('', 'Fant ikke siden', 404);

    return <PageBase content={props} />;
};

export default ErrorPage404;
