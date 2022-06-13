import { ContentType, CustomContentCommonProps } from './_content-common';

export interface SiteProps extends CustomContentCommonProps {
    __typename: ContentType.Site;
}
