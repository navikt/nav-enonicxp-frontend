import { Alert } from '@navikt/ds-react';

import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { DetailProps } from 'components/parts/office-editorial-detail/OfficeEditorialDetail';

export const SocialHelpPayoutInformation = ({ officeData }: DetailProps) => {
    const payoutInformation = officeData.brukerkontakt?.informasjonUtbetalinger;

    if (!payoutInformation) {
        return null;
    }
    const payoutInformatioWithBreaks = payoutInformation.replaceAll('\n', '<br/>');

    return <Alert variant="info">{<ParsedHtml htmlProps={payoutInformatioWithBreaks} />}</Alert>;
};
