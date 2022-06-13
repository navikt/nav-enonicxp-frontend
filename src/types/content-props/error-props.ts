import { ContentType, CustomContentCommonProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorCode?: number;
    errorId?: string;
    feedback?: boolean;
};

export interface ErrorProps extends CustomContentCommonProps {
    __typename: ContentType.Error;
    data: ErrorData;
}
