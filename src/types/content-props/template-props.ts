import { ContentType, ContentCommonProps } from './_content-common';

export interface TemplateProps extends ContentCommonProps {
    __typename: ContentType.TemplatePage;
}
