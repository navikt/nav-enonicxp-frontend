import pressIcon from '/public/gfx/press-speaker-icon-black.svg';
import newsIcon from '/public/gfx/news-paper-icon-black.svg';
import { translator } from 'translations';
import { Detail, Heading, Link } from '@navikt/ds-react';
import { shortenText } from 'utils/string';
import { StaticImage } from '../image/StaticImage';
import { getPublicPathname } from 'utils/urls';
import { formatDate } from 'utils/datetime';

import styles from './PressNewsItem.module.scss';

type PressNewsItemProps = {
    newsItem: any;
};

export const PressNewsItem = ({ newsItem }: PressNewsItemProps) => {
    const { language } = newsItem;
    const getTranslations = translator('pressLanding', language);
    const isNews = newsItem?.data?.contentType === 'news';
    const icon = isNews ? newsIcon : pressIcon;

    return (
        <li key={newsItem._path} className={styles.newsItem}>
            <Link href={getPublicPathname(newsItem)}>
                <Heading level={'3'} size={'medium'}>
                    {newsItem.displayName}
                </Heading>
            </Link>
            <div className={styles.ingress}>
                {shortenText(newsItem.data.ingress, 240, 30)}
            </div>
            <div className={styles.newsTagline}>
                <StaticImage
                    imageData={icon}
                    alt={''}
                    className={styles.tagIcon}
                />
                <Detail className={styles.newsType} uppercase={true}>
                    {getTranslations(isNews ? 'news' : 'press')}
                </Detail>
                <Detail className={styles.publishDate}>
                    {getTranslations('published')}{' '}
                    {formatDate({
                        datetime: newsItem.createdTime,
                        language,
                        short: true,
                        year: true,
                    })}
                </Detail>
            </div>
        </li>
    );
};
