type BaseInputFields = {
    explanation?: string;
    label?: string;
    variableName?: string;
};

type GlobalValue = {
    variableName?: string;
    value?: number;
};

type OptionItem = {
    label?: string;
    value?: number;
};

type DropdownFields = {
    optionItems: OptionItem[];
};

export type CalculatorFieldData = {
    inputField?: BaseInputFields;
    dropdownField?: BaseInputFields & DropdownFields;
    globalValue?: GlobalValue;
};

export type CalculatorData = {
    fields: CalculatorFieldData[];
    calculationScript: string;
    useThousandSeparator: boolean;
    summaryText: string;
};

export type PartConfigCalculator = {
    header?: string;
    targetCalculator?: {
        data: CalculatorData;
    };
    filters?: string[];
};
