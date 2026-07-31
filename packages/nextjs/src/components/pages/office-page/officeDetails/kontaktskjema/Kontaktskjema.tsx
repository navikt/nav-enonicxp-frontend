import { BodyLong, Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import styles from './Kontaktskjema.module.scss';

type Props = {
    officeData: Pick<OfficeDetailsData, 'type'>;
};

export const Kontaktskjema = ({ officeData }: Props) => {
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

    if (['OKONOMI', 'OPPFUTLAND', 'KONTROLL'].includes(officeData.type)) {
        return (
            <div className={styles.kontaktskjema}>
                <Heading level="2" size="small" spacing>
                    Søknader og skjema
                </Heading>
                <BodyLong as="div">
                    Skal du sende inn et skjema eller søke om støtte fra Nav? Velg riktig oversikt:
                    <ul>
                        <li>
                            <LenkeInline href="https://www.nav.no/soknader/">
                                Søknad og skjema for privatpersoner
                            </LenkeInline>
                        </li>
                        <li>
                            <LenkeInline href="https://www.nav.no/arbeidsgiver/soknader">
                                Søknad og skjema for arbeidsgivere
                            </LenkeInline>
                        </li>
                        <li>
                            <LenkeInline href="https://www.nav.no/samarbeidspartner/soknader">
                                Søknad og skjema for samarbeidspartnere
                            </LenkeInline>
                        </li>
                    </ul>
                </BodyLong>
            </div>
        );
    }

    return null;
};
