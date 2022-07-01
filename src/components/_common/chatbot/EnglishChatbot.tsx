import React from 'react';
import { ChatbotLinkPanel } from './ChatbotLinkPanel';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';

import style from './EnglishChatbot.module.scss';

const showOnContentTypes: { [Type in ContentType]?: true } = {
    [ContentType.MainArticle]: true,
    [ContentType.MainArticleChapter]: true,
    [ContentType.PageList]: true,
    [ContentType.SectionPage]: true,
    [ContentType.MainArticle]: true,
};

type Props = {
    content: ContentProps;
};

// Temporary component for legacy english pages
export const EnglishChatbot = ({ content }: Props) => {
    if (content.language !== 'en' || !showOnContentTypes[content.__typename]) {
        return null;
    }

    return (
        <div className={style.englishChat}>
            <ChatbotLinkPanel
                analyticsGroup={'English chat panel'}
                linkText={'Chat with us'}
                ingress={'¯\\_(ツ)_/¯'}
            />
        </div>
    );
};
