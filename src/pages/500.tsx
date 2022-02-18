import React from 'react';
import { makeErrorProps } from '../utils/make-error-props';
import PageBase from '../components/PageBase';

export const ErrorPage500 = () => {
    const props = makeErrorProps();

    return <PageBase content={props} />;
};

export default ErrorPage500;
