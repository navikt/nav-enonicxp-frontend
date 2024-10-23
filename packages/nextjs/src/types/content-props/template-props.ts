import { ContentType, ContentCommonProps } from './_content-common';

export type TemplateProps = ContentCommonProps & {
    type: ContentType.TemplatePage;
    data: {
        supports?: ContentType[];
    };
};
