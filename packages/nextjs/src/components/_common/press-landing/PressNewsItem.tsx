import React from 'react';
import { Detail, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { shortenText } from 'utils/string';
import { StaticImage } from 'components/_common/image/StaticImage';
import { getPublicPathname } from 'utils/urls';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import pressIcon from '/public/gfx/press-speaker-icon-black.svg';
import newsIcon from '/public/gfx/news-paper-icon-black.svg';

import style from './PressNewsItem.module.scss';

type Props = {
    newsItem: Pick<
        ContentProps,
        'language' | 'type' | 'data' | '_path' | 'displayName' | 'publish' | 'createdTime'
    >;
};

function hasContentType(data: any): data is { contentType: string } {
    return data && typeof data.contentType === 'string';
}

export const PressNewsItem = ({ newsItem }: Props) => {
    const { language } = newsItem;
    const getTranslations = translator('pressLanding', language);
    const getTaglineElements = ({ newsItem }: Props) => {
        if (newsItem.type === ContentType.Artikkel) {
            const isNews = hasContentType(newsItem.data) && newsItem.data.contentType === 'news';
            const icon = isNews ? newsIcon : pressIcon;
            const tagName = getTranslations(isNews ? 'news' : 'press');
            return { icon, tagName };
        }
        return { icon: null, tagName: null };
    };
    const { icon, tagName } = getTaglineElements({ newsItem });
    const datetime = getPublishedDateTime(newsItem);

    return (
        <li key={newsItem._path} className={style.newsItem}>
            <article>
                <Heading level={'3'} size={'medium'}>
                    <LenkeBase href={getPublicPathname({ _path: newsItem._path })}>
                        {newsItem.displayName}
                    </LenkeBase>
                </Heading>
                {newsItem.data?.ingress && (
                    <div className={style.ingress}>
                        {shortenText(newsItem.data.ingress, 240, 30)}
                    </div>
                )}
                <div className={style.newsTagline}>
                    {icon && <StaticImage imageData={icon} />}
                    {tagName && (
                        <Detail className={style.newsType} uppercase={true}>
                            {tagName}
                        </Detail>
                    )}
                    <Detail as={'time'} dateTime={datetime} className={style.publishDate}>
                        {getTranslations('published')}{' '}
                        {formatDate({
                            datetime,
                            language,
                            short: true,
                            year: true,
                        })}
                    </Detail>
                </div>
            </article>
        </li>
    );
};
