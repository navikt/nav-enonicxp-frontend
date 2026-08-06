import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import styles from './Kontaktskjema.module.scss';

type Props = {
    officeData: Pick<OfficeDetailsData, 'type'>;
    showApplicationFormLinks?: boolean;
};

export const Kontaktskjema = ({ officeData, showApplicationFormLinks }: Props) => {
    const { language } = usePageContentProps();
    const getOfficeTranslations = translator('office', language);

    if (officeData.type === 'ALS') {
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
    }

    if (
        showApplicationFormLinks ||
        ['OKONOMI', 'OPPFUTLAND', 'KONTROLL'].includes(officeData.type)
    ) {
        return (
            <div className={styles.kontaktskjema}>
                <Heading level="2" size="small" spacing>
                    Søknader og skjema
                </Heading>
                <BodyLong>
                    Finn søknader og skjemaer for{' '}
                    <LenkeInline href="https://www.nav.no/soknader/">privatpersoner</LenkeInline>.
                    Det finnes egne oversikter for{' '}
                    <LenkeInline href="https://www.nav.no/arbeidsgiver/soknader">
                        arbeidsgivere
                    </LenkeInline>{' '}
                    og{' '}
                    <LenkeInline href="https://www.nav.no/samarbeidspartner/soknader">
                        samarbeidspartnere
                    </LenkeInline>
                    .
                </BodyLong>
            </div>
        );
    }

    return null;
};
