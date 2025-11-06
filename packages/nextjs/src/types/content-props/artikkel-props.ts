import { XpImageProps } from 'types/media';
import { MenuListItems } from 'types/menu-list-items';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { KapittelNavigasjonData } from './kapittel-props';

export type Picture = Partial<{
    target: XpImageProps;
    size: '100' | '70' | '40';
    caption: string;
    altText: string;
}>;

export type ArticleContentType = 'news' | 'pressRelease' | 'lastingContent';
export type ArticleSubContentType = 'statistics' | 'none';

export type ArtikkelData = Partial<{
    ingress: string;
    text: ProcessedHtmlProps;
    hasTableOfContents: string;
    fact: ProcessedHtmlProps;
    contentType: ArticleContentType;
    subContentType: ArticleSubContentType;
    picture: Picture;
    menuListItems: MenuListItems;
    chapters: KapittelNavigasjonData[];
}>;

export type ArtikkelProps = ContentCommonProps & {
    type: ContentType.Artikkel;
    data: ArtikkelData;
};
