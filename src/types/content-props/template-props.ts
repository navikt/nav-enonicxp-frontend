import { ContentType, ContentProps } from './_content-common';

export interface TemplateProps extends ContentProps {
    __typename: ContentType.TemplatePage;
}
