import React from 'react';
import { ErrorProps } from '../../../types/content-types/error-props';

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;
    const message = `Error! ${errorMessage}${
        errorCode ? ` - Error code ${errorCode}` : ''
    }`;

    return <div>{message}</div>;
};
