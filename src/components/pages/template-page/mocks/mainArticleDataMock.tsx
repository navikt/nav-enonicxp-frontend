import { MainArticleData } from '../../../../types/content-props/main-article-props';
import { getProcessedHtmlPropsWithBackwardsCompatibility } from '../../../../types/processed-html-props';

export const mainArticleDataMock: MainArticleData = {
    ingress: '',
    text: getProcessedHtmlPropsWithBackwardsCompatibility(''),
    hasTableOfContents: 'none',
    fact: getProcessedHtmlPropsWithBackwardsCompatibility(''),
    social: [],
};
