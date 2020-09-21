import React from 'react';
import { ErrorProps } from '../../../types/content-types/error-props';

export const ErrorPage = ({ data: { error } }: ErrorProps) => {
    return <div>{`Error! ${error}`}</div>;
};
