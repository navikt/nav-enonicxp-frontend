import React from 'react';
import { Detail, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { shortenText } from 'utils/string';
import { StaticImage } from 'components/_common/image/StaticImage';
import { getPublicPathname } from 'utils/urls';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import pressIcon from '/public/gfx/press-speaker-icon-black.svg';
import newsIcon from '/public/gfx/news-paper-icon-black.svg';

import style from './PressNewsItem.module.scss';

type PressNewsItemProps = Pick<
    ContentProps,
    '_path' | 'language' | 'type' | 'displayName' | 'data' | 'publish' | 'createdTime'
>;

type Props = {
    newsItem: PressNewsItemProps;
};

export const PressNewsItem = ({ newsItem }: Props) => {
    const { language, publish, createdTime } = newsItem;
    const getTranslations = translator('pressLanding', language);

    const getTaglineElements = (newsItem: PressNewsItemProps) => {
        if (newsItem.type === ContentType.MainArticle) {
            const isNews = (newsItem.data as { contentType?: string }).contentType === 'news'; //TODO fix type
            //TODO brukes news på denne siden i det hele tatt? Kan dette og ikonet fjernes?
            const icon = isNews ? newsIcon : pressIcon;
            const tagName = getTranslations(isNews ? 'news' : 'press');
            return { icon, tagName };
        }
        return { icon: null, tagName: null };
    };

    const { icon, tagName } = getTaglineElements(newsItem);

    return (
        <li key={newsItem._path} className={style.newsItem}>
            <LenkeBase href={getPublicPathname(newsItem)}>
                <Heading level={'3'} size={'medium'}>
                    {newsItem.displayName}
                </Heading>
            </LenkeBase>
            {newsItem.data?.ingress && (
                <div className={style.ingress}>{shortenText(newsItem.data.ingress, 240, 30)}</div>
            )}
            <div className={style.newsTagline}>
                {icon && <StaticImage imageData={icon} />}
                {tagName && (
                    <Detail className={style.newsType} uppercase={true}>
                        {tagName}
                    </Detail>
                )}
                <Detail className={style.publishDate}>
                    {getTranslations('published')}{' '}
                    {formatDate({
                        datetime: getPublishedDateTime({ publish, createdTime }),
                        language,
                        short: true,
                        year: true,
                    })}
                </Detail>
            </div>
        </li>
    );
};
