import { Alert } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { DetaljinformasjonForDetAktuelleKontoretProps } from 'components/parts/detaljinformasjon-for-det-aktuelle-kontoret/DetaljinformasjonForDetAktuelleKontoretPart';

export const SocialHelpPayoutInformation = ({
    officeData,
}: DetaljinformasjonForDetAktuelleKontoretProps) => {
    const payoutInformation = officeData.brukerkontakt?.informasjonUtbetalinger;

    if (!payoutInformation) {
        return null;
    }
    const payoutInformatioWithBreaks = payoutInformation.replaceAll('\n', '<br/>');

    return <Alert variant="info">{<ParsedHtml htmlProps={payoutInformatioWithBreaks} />}</Alert>;
};
