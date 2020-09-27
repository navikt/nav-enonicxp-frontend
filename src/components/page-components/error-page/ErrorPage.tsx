import React from 'react';
import { ErrorProps } from '../../../types/content-types/error-props';

export const ErrorPage = (props: ErrorProps) => {
    const { errorMessage, errorCode } = props.data;
    return (
        <div>{`Error! ${errorMessage}${errorCode && ` - ${errorCode}`}`}</div>
    );
};
