import { ContentType, ContentCommonProps } from './_content-common';

export interface TemplateProps extends ContentCommonProps {
    type: ContentType.TemplatePage;
    data: {
        supports?: ContentType[];
    };
}
