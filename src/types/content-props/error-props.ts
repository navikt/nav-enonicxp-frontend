import { ContentType, ContentCommonProps } from './_content-common';

export type ErrorData = {
    errorCode: number;
    errorMessage?: string;
    errorMessageInternal?: string;
    errorId?: string;
};

export type ErrorProps = ContentCommonProps & {
    type: ContentType.Error;
    data: ErrorData;
};
