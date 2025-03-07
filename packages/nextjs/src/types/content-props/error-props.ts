import { ContentType, ContentCommonProps } from './_content-common';

export type ErrorData = {
    errorMessage: string;
    errorMessageInternal?: string;
    errorCode: number;
    errorId?: string;
    feedback?: boolean;
};

export type ErrorProps = ContentCommonProps & {
    type: ContentType.Error;
    data: ErrorData;
};
