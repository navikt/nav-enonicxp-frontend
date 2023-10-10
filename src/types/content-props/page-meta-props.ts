import { OptionSetSingle } from 'types/util-types';
import { ContentCommonProps, ContentType } from './_content-common';
import { AudienceProps } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { AnimatedIconsData } from './animated-icons';
import { Owner } from 'types/owner';

type ProductPageMetaData = {
    audience: AudienceProps;
    area: Area[];
    taxonomy?: Taxonomy[];
    illustration: AnimatedIconsData;
    owner: Owner[];
    customPath: string;
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

type SituationPageMetaData = {
    audience: AudienceProps;
    area: Area[];
    illustration: AnimatedIconsData;
    owner: Owner[];
    customPath: string;
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

type ToolsPageMetaData = {
    audience: AudienceProps;
    area: Area[];
    taxonomy?: Taxonomy[];
    illustration: AnimatedIconsData;
    owner: Owner[];
    customPath: string;
};

type GenericPageMetaData = {
    audience: AudienceProps;
    illustration: AnimatedIconsData;
    customPath: string;
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

type ThemedArticlePageMetaData = {
    audience: AudienceProps;
    taxonomy?: Taxonomy[];
    area: Area[];
    illustration: AnimatedIconsData;
    customPath: string;
    owner: Owner[];
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

type GuidePageMetaData = {
    audience: AudienceProps;
    area: Area[];
    illustration: AnimatedIconsData;
    customPath: string;
    owner: Owner[];
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

type CurrentTopicPageMetaData = {
    audience: AudienceProps;
    area: Area[];
    customPath: string;
    owner: Owner[];
    feedbackToggle: boolean;
    chatbotToggle: boolean;
};

export type PageMetaProps = ContentCommonProps & {
    type: ContentType.PageMeta;
    data: {
        contentType: OptionSetSingle<{
            content_page_with_sidemenus: ProductPageMetaData;
            situation_page: SituationPageMetaData;
            tools_page: ToolsPageMetaData;
            generic_page: GenericPageMetaData;
            themed_article_page: ThemedArticlePageMetaData;
            guide_page: GuidePageMetaData;
            current_topic_page: CurrentTopicPageMetaData;
        }>;
    };
};
