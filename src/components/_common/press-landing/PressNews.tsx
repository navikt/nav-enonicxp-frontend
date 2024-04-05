import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { translator } from 'translations';
import { Heading, Link } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { PressNewsItem } from './PressNewsItem';

import styles from './PressNews.module.scss';

type PressNewsProps = {
    page: PressLandingPageProps;
};

export const PressNews = (props: PressNewsProps) => {
    const { language } = props.page;
    const { pressNews, moreNewsUrl } = props.page?.data;

    const getTranslations = translator('pressLanding', language);

    if (!pressNews?.data?.sectionContents || pressNews?.data?.sectionContents?.length === 0) {
        return null;
    }

    return (
        <div className={styles.pressNews}>
            <div className={styles.content}>
                <Heading level={'2'} size={'large'}>
                    {getTranslations('latestPressNews')}
                </Heading>
                <ul className={styles.newsList}>
                    {pressNews.data.sectionContents.map((newsItem) => (
                        <PressNewsItem newsItem={newsItem} key={newsItem._path} />
                    ))}
                </ul>
                {moreNewsUrl && (
                    <Link href={moreNewsUrl}>
                        <ChevronRightIcon aria-hidden={true} />
                        {getTranslations('morePressNews')}
                    </Link>
                )}
            </div>
        </div>
    );
};
