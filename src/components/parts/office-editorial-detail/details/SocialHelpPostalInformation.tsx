import { Alert } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { DetailProps } from '../OfficeEditorialDetail';

export const SocialHelpPostalInformation = ({ officeData }: DetailProps) => {
    const postalInfo =
        officeData.brukerkontakt?.sosialhjelp?.papirsoeknadInformasjon;

    if (!postalInfo) {
        return null;
    }

    return (
        <Alert variant="info">
            <ParsedHtml htmlProps={postalInfo} />
        </Alert>
    );
};
