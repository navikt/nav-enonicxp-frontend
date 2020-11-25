import { ContentType, GlobalContentProps } from './_content-common';

export interface TemplateProps extends GlobalContentProps {
    __typename: ContentType.TemplatePage;
}
