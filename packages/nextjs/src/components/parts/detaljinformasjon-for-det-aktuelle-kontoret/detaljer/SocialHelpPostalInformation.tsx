import { Alert } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { DetaljinformasjonForDetAktuelleKontoretProps } from 'components/parts/detaljinformasjon-for-det-aktuelle-kontoret/DetaljinformasjonForDetAktuelleKontoretPart';

export const SocialHelpPostalInformation = ({
    officeData,
}: DetaljinformasjonForDetAktuelleKontoretProps) => {
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
