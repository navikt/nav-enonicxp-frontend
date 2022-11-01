import { DetailProps } from '../OfficeEditorialDetail';
import styles from './Details.module.scss';

import { translator } from '../../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const ServiceInformation = ({ officeData }: DetailProps) => {
    const { language } = usePageConfig();
    const getServiceTranslation = translator('audienceServices', language);
    const serviceInformation =
        officeData.brukerkontakt.brukertjenesteTilbud.tjenester;

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
