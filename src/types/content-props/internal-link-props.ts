import { ContentType, CustomContentCommonProps } from './_content-common';

export type InternalLinkData = {
    description?: string;
    target: {
        _path: string;
    };
    permanentRedirect?: boolean;
};

export interface InternalLinkProps extends CustomContentCommonProps {
    __typename: ContentType.InternalLink;
    data: InternalLinkData;
}
