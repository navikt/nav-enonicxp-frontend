import { Alert } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { OfficeEditorialDetailProps } from 'components/parts/office-editorial-detail/OfficeEditorialDetailPart';

export const SocialHelpPayoutInformation = ({ officeData }: OfficeEditorialDetailProps) => {
    const payoutInformation = officeData.brukerkontakt?.informasjonUtbetalinger;

    if (!payoutInformation) {
        return null;
    }
    const payoutInformatioWithBreaks = payoutInformation.replaceAll('\n', '<br/>');

    return <Alert variant="info">{<ParsedHtml htmlProps={payoutInformatioWithBreaks} />}</Alert>;
};
