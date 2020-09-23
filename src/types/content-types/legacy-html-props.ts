import { ContentType, GlobalSchema } from './_schema';

export interface LegacyHtmlProps extends GlobalSchema {
    __typename: ContentType.LegacyHtml;
    data: {
        html: string;
    };
}
