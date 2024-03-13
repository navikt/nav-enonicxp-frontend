import { DetailProps } from '../OfficeEditorialDetail';
import { translator } from 'translations';
import { usePageContext } from 'store/pageContext';
import { forceArray } from 'utils/arrays';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

/* ES lint complains about unused style in a shared styles class: */
/* eslint-disable-next-line */
import styles from './SharedDetails.module.scss';

export const ServiceInformation = ({ officeData }: DetailProps) => {
    const { language } = usePageContext();
    const getServiceTranslation = translator('audienceServices', language);
    const serviceInformation = forceArray(
        officeData.brukerkontakt?.brukertjenesteTilbud?.tjenester
    );

    return (
        <ul className={styles.bulletList}>
            <li>{getServiceTranslation('HJELP_KOMME_I_JOBB')}</li>
            <li>{getServiceTranslation('NODSITUASJON')}</li>
            <li>{getServiceTranslation('OKONOMI_GJELD')}</li>
            <li>{getServiceTranslation('TILGANGPC')}</li>
            <li>{getServiceTranslation('HJELPDIGITALETJENESTER')}</li>
            {serviceInformation.map((service) => {
                if (service.type === 'SJOFARTSOPPGAVER') {
                    return (
                        <li key={service.type}>
                            <LenkeBase href="https://www.nav.no/arbeidsgiver/sjofartsoppgaver">
                                {getServiceTranslation(service.type)}
                            </LenkeBase>
                        </li>
                    );
                }
                return (
                    <li key={service.type}>
                        {getServiceTranslation(service.type)}
                    </li>
                );
            })}
        </ul>
    );
};
