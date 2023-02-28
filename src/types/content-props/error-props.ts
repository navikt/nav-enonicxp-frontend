import { ContentType, ContentCommonProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorMessageInternal?: string;
    errorCode?: number;
    errorId?: string;
    feedback?: boolean;
};

export interface ErrorProps extends ContentCommonProps {
    type: ContentType.Error;
    data: ErrorData;
}
