import { ContentType, ContentCommonProps } from './_content-common';

export type ErrorData = {
    errorMessage: string;
    errorMessageInternal: string;
    errorCode: number;
    errorId?: string;
};

export type ErrorProps = ContentCommonProps & {
    type: ContentType.Error;
    data: ErrorData;
};
