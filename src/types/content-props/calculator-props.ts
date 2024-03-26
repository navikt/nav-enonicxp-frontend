import { ContentType, ContentCommonProps } from './_content-common';
import { CalculatorData } from 'types/component-props/part-configs/calculator';

export type CalculatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};
