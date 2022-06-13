import { ContentType, CustomContentCommonProps } from './_content-common';

export interface TemplateProps extends CustomContentCommonProps {
    __typename: ContentType.TemplatePage;
}
