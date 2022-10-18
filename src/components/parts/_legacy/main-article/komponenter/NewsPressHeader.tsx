import { Detail, Heading } from '@navikt/ds-react';
import { ArticleContentType } from 'types/content-props/main-article-props';

import newsPaper from '/public/gfx/news-paper-icon.svg';
import pressSpeaker from '/public/gfx/press-speaker-icon.svg';
import { StaticImage } from 'components/_common/image/StaticImage';

import styles from './NewsPressHeader.module.scss';
import { Language, translator } from 'translations';

type NewsPressHeaderProps = {
    type: ArticleContentType;
    title: string;
    language: Language;
};

export const NewsPressHeader = ({
    type,
    title,
    language,
}: NewsPressHeaderProps) => {
    const icon = type === 'news' ? newsPaper : pressSpeaker;
    const getLabel = translator('mainArticle', language);

    return (
        <div className={styles.newsPressHeader}>
            <div className={styles.tagWrapper}>
                <StaticImage
                    imageData={icon}
                    alt={''}
                    className={styles.tagIcon}
                />
                <Detail className={styles.tagLabel}>{getLabel(type)}</Detail>
            </div>
            <Heading level={'1'} size={'xlarge'}>
                {title}
            </Heading>
        </div>
    );
};
