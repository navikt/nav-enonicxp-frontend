import { ContentType, ContentCommonProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorMessageInternal?: string;
    errorCode?: number;
    errorId?: string;
    feedback?: boolean;
    noindex: true;
};

export interface ErrorProps extends ContentCommonProps {
    __typename: ContentType.Error;
    data: ErrorData;
}
