import { CalculatorData } from 'components/parts/calculator/CalculatorPart';
import { ContentType, ContentCommonProps } from './_content-common';

export type CalculatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};
