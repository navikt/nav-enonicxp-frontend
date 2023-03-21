import { DetailProps } from '../OfficeEditorialDetail';

import { translator } from '../../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

/* eslint-disable-next-line */
import styles from './SharedDetails.module.scss';
import { forceArray } from 'utils/arrays';

export const ServiceInformation = ({ officeData }: DetailProps) => {
    const { language } = usePageConfig();
    const getServiceTranslation = translator('audienceServices', language);
    const serviceInformation = forceArray(
        officeData.brukerkontakt?.brukertjenesteTilbud?.tjenester
    );

    return (
        <ul className={styles.bulletList}>
            <li>{getServiceTranslation('NODSITUASJON')}</li>
            <li>{getServiceTranslation('TILGANGPC')}</li>
            <li>{getServiceTranslation('HJELPDIGITALETJENESTER')}</li>
            {serviceInformation.map((service) => (
                <li key={service.type}>
                    {getServiceTranslation(service.type)}
                </li>
            ))}
        </ul>
    );
};
