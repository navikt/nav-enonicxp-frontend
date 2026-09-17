import { Detail, Heading } from '@navikt/ds-react';
import { ArticleContentType, ArtikkelProps } from 'types/content-props/artikkel-props';
import { Language, translator } from 'translations';
import { StaticImage } from 'components/_common/image/StaticImage';
import ArtikkelDato from 'components/parts/_legacy/artikkel/komponenter/ArtikkelDato';

import newsPaper from '/public/gfx/news-paper-icon.svg';
import pressSpeaker from '/public/gfx/press-speaker-icon.svg';

import styles from './NewsPressHeader.module.scss';

type NewsPressHeaderProps = {
    articleProps: ArtikkelProps;
    language: Language;
    title: string;
    type: ArticleContentType;
};

export const NewsPressHeader = ({ articleProps, language, title, type }: NewsPressHeaderProps) => {
    const icon = type === 'news' ? newsPaper : pressSpeaker;
    const getLabel = translator('mainArticle', language);

    const tagLocaleId = type === 'news' ? 'news' : 'pressRelease';

    return (
        <section className={styles.newsPressHeader}>
            <div className={styles.tagWrapper}>
                <StaticImage imageData={icon} className={styles.tagIcon} />
                <Detail className={styles.tagLabel}>{getLabel(tagLocaleId)}</Detail>
            </div>
            <Heading level={'1'} size={'xlarge'}>
                {title}
            </Heading>
            <ArtikkelDato contentProps={articleProps} type={'newsPress'} />
        </section>
    );
};
