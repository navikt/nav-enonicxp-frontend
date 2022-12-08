import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { translator } from 'translations';
import styles from './PressNews.module.scss';
import { Detail, Heading, Link } from '@navikt/ds-react';

import pressIcon from '/public/gfx/press-speaker-icon-black.svg';
import newsIcon from '/public/gfx/news-paper-icon-black.svg';
import { StaticImage } from '../image/StaticImage';
import { formatDate } from 'utils/datetime';
import { Next } from '@navikt/ds-icons';
import { getPublicPathname } from 'utils/urls';

type PressNewsProps = {
    page: PressLandingPageProps;
};

export const PressNews = (props: PressNewsProps) => {
    const { pressNews, moreNewsUrl, maxNewsCount } = props.page?.data;
    const { language } = props.page;

    const getTranslations = translator('pressLanding', language);

    if (!pressNews || pressNews.length === 0) return null;

    const pressNewsItems = pressNews.data.sectionContents.slice(
        0,
        parseInt(maxNewsCount, 10) || 5
    );

    const shortenIngress = (ingress: string) => {
        const maxIngressLength = 234;
        if (ingress.length > maxIngressLength + 30) {
            return ingress.substring(0, maxIngressLength) + '...';
        }
        return ingress;
    };

    return (
        <div className={styles.pressNews}>
            <div className={styles.content}>
                <Heading level={'2'} size={'large'}>
                    {getTranslations('latestPressNews')}
                </Heading>
                <ul className={styles.newsList}>
                    {pressNewsItems.map((newsItem, index) => {
                        const isNews = newsItem?.data?.contentType === 'news';
                        const icon = isNews ? newsIcon : pressIcon;
                        return (
                            <li key={index} className={styles.newsItem}>
                                <Link href={getPublicPathname(newsItem)}>
                                    <Heading level={'3'} size={'medium'}>
                                        {newsItem.displayName}
                                    </Heading>
                                </Link>
                                <div className={styles.ingress}>
                                    {shortenIngress(newsItem.data.ingress)}
                                </div>
                                <div className={styles.newsTagline}>
                                    <StaticImage
                                        imageData={icon}
                                        alt={''}
                                        className={styles.tagIcon}
                                    />
                                    <Detail
                                        className={styles.newsType}
                                        uppercase={true}
                                    >
                                        {getTranslations(
                                            isNews ? 'news' : 'press'
                                        )}
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
                    })}
                </ul>
                {moreNewsUrl && (
                    <Link href={moreNewsUrl}>
                        <Next />
                        {getTranslations('morePressNews')}
                    </Link>
                )}
            </div>
        </div>
    );
};
