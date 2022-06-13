import { ContentType, CustomContentCommonProps } from './_content-common';

export type ExternalLinkData = {
    description?: string;
    url: string;
    permanentRedirect?: boolean;
};

export interface ExternalLinkProps extends CustomContentCommonProps {
    __typename: ContentType.ExternalLink;
    data: ExternalLinkData;
}
