import pressIcon from '/public/gfx/press-speaker-icon-black.svg';
import newsIcon from '/public/gfx/news-paper-icon-black.svg';
import { translator } from 'translations';
import { Detail, Heading, Link } from '@navikt/ds-react';
import { shortenText } from 'utils/string';
import { StaticImage } from '../image/StaticImage';
import { getPublicPathname } from 'utils/urls';
import { formatDate } from 'utils/datetime';

import { ContentProps, ContentType } from 'types/content-props/_content-common';
import styles from './PressNewsItem.module.scss';

type PressNewsItemProps = {
    newsItem: ContentProps;
};

export const PressNewsItem = ({ newsItem }: PressNewsItemProps) => {
    const { language } = newsItem;
    const getTranslations = translator('pressLanding', language);

    const getTaglineElements = (newsItem: ContentProps) => {
        if (newsItem.type === ContentType.MainArticle) {
            const isNews = newsItem?.data?.contentType === 'news';
            const icon = isNews ? newsIcon : pressIcon;
            const tagName = getTranslations(isNews ? 'news' : 'press');
            return { icon, tagName };
        }
        return { icon: null, tagName: null };
    };

    const { icon, tagName } = getTaglineElements(newsItem);

    return (
        <li key={newsItem._path} className={styles.newsItem}>
            <Link href={getPublicPathname(newsItem)}>
                <Heading level={'3'} size={'medium'}>
                    {newsItem.displayName}
                </Heading>
            </Link>
            <div className={styles.ingress}>
                {shortenText(newsItem.data?.ingress, 240, 30)}
            </div>
            <div className={styles.newsTagline}>
                {icon && <StaticImage imageData={icon} alt={''} />}
                {tagName && (
                    <Detail className={styles.newsType} uppercase={true}>
                        {tagName}
                    </Detail>
                )}
                <Detail className={styles.publishDate}>
                    {getTranslations('published')}{' '}
                    {formatDate({
                        datetime: newsItem.publish.first,
                        language,
                        short: true,
                        year: true,
                    })}
                </Detail>
            </div>
        </li>
    );
};
