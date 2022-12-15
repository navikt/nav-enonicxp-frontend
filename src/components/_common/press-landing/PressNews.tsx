import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { translator } from 'translations';
import { Heading, Link } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';
import { PressNewsItem } from './PressNewsItem';

import styles from './PressNews.module.scss';
import { MainArticleProps } from 'types/content-props/main-article-props';

type PressNewsProps = {
    page: PressLandingPageProps;
};

export const PressNews = (props: PressNewsProps) => {
    const { language } = props.page;
    const { pressNews, moreNewsUrl, maxNewsCount } = props.page?.data;

    const getTranslations = translator('pressLanding', language);

    if (
        !pressNews?.data?.sectionContents ||
        pressNews?.data?.sectionContents?.length === 0
    ) {
        return null;
    }

    const pressNewsItems = pressNews.data.sectionContents
        .sort((a: MainArticleProps, b: MainArticleProps) =>
            a.createdTime < b.createdTime ? 1 : -1
        )
        .slice(0, parseInt(maxNewsCount, 10) || 5);

    return (
        <div className={styles.pressNews}>
            <div className={styles.content}>
                <Heading level={'2'} size={'large'}>
                    {getTranslations('latestPressNews')}
                </Heading>
                <ul className={styles.newsList}>
                    {pressNewsItems.map((newsItem) => (
                        <PressNewsItem
                            newsItem={newsItem}
                            key={newsItem._path}
                        />
                    ))}
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
