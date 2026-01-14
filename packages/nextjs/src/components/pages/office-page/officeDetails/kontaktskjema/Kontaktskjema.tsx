import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import styles from './Kontaktskjema.module.scss';

export const Kontaktskjema = () => {
    const { language } = usePageContentProps();
    const getOfficeTranslations = translator('office', language);

    const skrivTilOssLenke = (
        <LenkeInline href="https://kontaktskjema.arbeidsgiver.nav.no/">
            {getOfficeTranslations('skriveTilOss')}
        </LenkeInline>
    );

    return (
        <div className={styles.kontaktskjema}>
            <Heading level="3" size="small" spacing>
                Kontaktskjema
            </Heading>
            <BodyLong>
                Du kan også {skrivTilOssLenke} {getOfficeTranslations('kontaktskjemaALSTekst')}
            </BodyLong>
        </div>
    );
};
