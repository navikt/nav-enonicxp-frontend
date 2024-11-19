import { Alert } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { OfficeEditorialDetailProps } from 'components/parts/office-editorial-detail/OfficeEditorialDetailPart';

export const SocialHelpPostalInformation = ({ officeData }: OfficeEditorialDetailProps) => {
    const postalInfo = officeData.brukerkontakt?.sosialhjelp?.papirsoeknadInformasjon;

    if (!postalInfo) {
        return null;
    }

    return (
        <Alert variant="info">
            <ParsedHtml htmlProps={postalInfo} />
        </Alert>
    );
};
