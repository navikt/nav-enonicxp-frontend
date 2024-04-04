import { ContentType, ContentCommonProps } from './_content-common';

import { CalculatorData } from 'components/parts/calculator/CalculatorPart';

export type CalculatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};
