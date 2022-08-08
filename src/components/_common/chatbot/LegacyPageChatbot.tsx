import React from 'react';
import { ChatbotLinkPanel } from './ChatbotLinkPanel';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { Language, translator } from '../../../translations';

import style from './LegacyPageChatbot.module.scss';

const showOnContentTypes: { [Type in ContentType]?: true } = {
    [ContentType.MainArticle]: true,
    [ContentType.MainArticleChapter]: true,
    [ContentType.PageList]: true,
    [ContentType.SectionPage]: true,
};

const showOnLanguage: { [Lang in Language]?: true } = {
    en: true,
};

type Props = {
    content: ContentProps;
};

export const LegacyPageChatbot = ({ content }: Props) => {
    if (
        !showOnContentTypes[content.__typename] ||
        !showOnLanguage[content.language]
    ) {
        return null;
    }

    const texts = translator('contactPoint', content.language)('legacyChat');

    return (
        <div className={style.legacyChat}>
            <ChatbotLinkPanel
                analyticsGroup={'Legacy chat panel'}
                linkText={texts['title']}
                ingress={texts['ingress']}
            />
        </div>
    );
};
