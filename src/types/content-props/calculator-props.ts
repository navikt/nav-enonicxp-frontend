import { CalculatorData } from 'types/component-props/parts/calculator';
import { ContentType, ContentCommonProps } from './_content-common';

export type CalculatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};
