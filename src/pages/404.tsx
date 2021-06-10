import React from 'react';
import { make404Props } from '../utils/make-error-props';
import PageBase from '../components/PageBase';

export const ErrorPage404 = () => {
    const props = make404Props();

    return <PageBase content={props} />;
};

export default ErrorPage404;
