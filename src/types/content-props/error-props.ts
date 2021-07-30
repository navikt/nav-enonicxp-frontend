import { ContentType, ContentProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorCode?: number;
    errorId?: string;
    feedback?: boolean;
};

export interface ErrorProps extends ContentProps {
    __typename: ContentType.Error;
    data: ErrorData;
}
