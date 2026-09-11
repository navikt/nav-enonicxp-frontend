import { Detail, Heading } from '@navikt/ds-react';
import { ArticleContentType } from 'types/content-props/artikkel-props';
import { ContentProps } from 'types/content-props/_content-common';
import { Language, translator } from 'translations';
import { StaticImage } from 'components/_common/image/StaticImage';
import ArtikkelDato from 'components/parts/_legacy/artikkel/komponenter/ArtikkelDato';
import { ArtikkelData } from 'types/content-props/artikkel-props';

import newsPaper from '/public/gfx/news-paper-icon.svg';
import pressSpeaker from '/public/gfx/press-speaker-icon.svg';

import styles from './NewsPressHeader.module.scss';

type NewsPressHeaderProps = {
    language: Language;
    page: ContentProps;
    title: string;
    type: ArticleContentType;
};

const isArtikkelData = (data: ContentProps['data']): data is ArtikkelData =>
    typeof data === 'object' && data !== null && 'contentType' in data;

export const NewsPressHeader = ({ language, page: _page, title, type }: NewsPressHeaderProps) => {
    const icon = type === 'news' ? newsPaper : pressSpeaker;
    const getLabel = translator('mainArticle', language);

    const tagLocaleId = type === 'news' ? 'news' : 'pressRelease';
    const isNewsArticle =
        hasArtikkelData(_page.data) &&
        (_page.data.contentType === 'news' || _page.data.contentType === 'pressRelease');

    return (
        <section className={styles.newsPressHeader}>
            <div className={styles.tagWrapper}>
                <StaticImage imageData={icon} className={styles.tagIcon} />
                <Detail className={styles.tagLabel}>{getLabel(tagLocaleId)}</Detail>
            </div>
            <Heading level={'1'} size={'xlarge'}>
                {title}
            </Heading>
            <ArtikkelDato contentProps={_page} type={isNewsArticle ? 'newsPress' : 'normal'} />
        </section>
    );
};
