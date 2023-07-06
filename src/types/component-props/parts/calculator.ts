import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export enum FieldType {
    INPUT,
    DROPDOWN,
    GLOBAL_VALUE,
}

interface BaseInputFields {
    explanation: string;
    label: string;
    variableName: string;
}

interface GlobalValue {
    variableName: string;
    value: number;
}

interface OptionItem {
    label: string;
    value: number;
}

interface DropdownFields {
    optionItems: OptionItem[];
}

export interface CalculatorFieldData {
    inputField?: BaseInputFields;
    dropdownField?: BaseInputFields & DropdownFields;
    globalValue?: GlobalValue;
}

export interface CalculatorData {
    fields: CalculatorFieldData[];
    calculationScript: string;
    useThousandSeparator: boolean;
    summaryText: string;
}

export interface CalculatorProps extends PartComponentProps {
    descriptor: PartType.Calculator;
    config: Partial<{
        header?: string;
        targetCalculator: {
            data: CalculatorData;
        };
        filters: string[];
    }>;
}
