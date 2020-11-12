import React from 'react';
import { ErrorPage } from '../components/page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';

const Error = ({ statusCode }) => {
    const props = makeErrorProps('This page could not be found.', statusCode);
    return <ErrorPage {...props} />;
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
