import { ContentType, ContentCommonProps } from './_content-common';
import { CalculatorData } from 'types/component-props/parts/calculator';

export type CalculatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};
