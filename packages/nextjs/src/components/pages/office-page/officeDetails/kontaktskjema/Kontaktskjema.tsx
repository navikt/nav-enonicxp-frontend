import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import styles from './Kontaktskjema.module.scss';

export const Kontaktskjema = () => {
    return (
        <div className={styles.kontaktskjema}>
            <Heading level="3" size="small" spacing>
                Kontaktskjema
            </Heading>
            <BodyLong>
                Du kan også{' '}
                <LenkeInline href="https://www.nav.no/skriv-til-oss">skrive til oss</LenkeInline>{' '}
                hvis du ønsker hjelp til å rekruttere eller inkludere arbeidstakere og forebygge
                sykefravær.
            </BodyLong>
        </div>
    );
};
