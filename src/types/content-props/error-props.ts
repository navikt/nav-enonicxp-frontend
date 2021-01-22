import { ContentType, ContentProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorCode?: number;
};

export interface ErrorProps extends ContentProps {
    __typename: ContentType.Error;
    data: ErrorData;
}
