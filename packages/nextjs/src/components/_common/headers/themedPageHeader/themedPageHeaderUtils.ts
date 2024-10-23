import { ContentType } from 'types/content-props/_content-common';

import style from './ThemedPageHeader.module.scss';

const contentTypeToClassName: { [key in ContentType]?: string } = {
    [ContentType.SituationPage]: style.situation,
    [ContentType.ProductPage]: style.product,
    [ContentType.GuidePage]: style.guide,
    [ContentType.ThemedArticlePage]: style.themedpage,
    [ContentType.ToolsPage]: style.tool,
    [ContentType.FormIntermediateStepPage]: style.intermediateStep,
    [ContentType.Overview]: style.overview,
    [ContentType.GenericPage]: style.generic,
};

export const themedPageHeaderGetTypeClassName = (contentType: ContentType) => {
    return contentTypeToClassName[contentType];
};
