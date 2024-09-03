import React from 'react';
import { Detail, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { shortenText } from 'utils/string';
import { StaticImage } from 'components/_common/image/StaticImage';
import { getPublicPathname } from 'utils/urls';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { ArticleContentType } from 'types/content-props/main-article-props';

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
    const { language, publish, createdTime, _path, displayName, data } = newsItem;
    const getTranslations = translator('pressLanding', language);

    const getTaglineElements = ({ type, data }: PressNewsItemProps) => {
        if (type === ContentType.MainArticle) {
            const isNews = (data as { contentType?: ArticleContentType }).contentType === 'news';
            const icon = isNews ? newsIcon : pressIcon;
            const tagName = getTranslations(isNews ? 'news' : 'press');
            return { icon, tagName };
        }
        return { icon: null, tagName: null };
    };

    const { icon, tagName } = getTaglineElements(newsItem);

    return (
        <li key={_path} className={style.newsItem}>
            <LenkeBase href={getPublicPathname(_path)}>
                <Heading level={'3'} size={'medium'}>
                    {displayName}
                </Heading>
            </LenkeBase>
            {data?.ingress && (
                <div className={style.ingress}>{shortenText(data.ingress, 240, 30)}</div>
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
