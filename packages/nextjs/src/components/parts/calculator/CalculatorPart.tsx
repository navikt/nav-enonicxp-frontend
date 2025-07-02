import React from 'react';
import { Calculator } from 'components/_common/calculator/Calculator';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';

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

export const CalculatorPart = ({ config }: PartComponentProps<PartType.Calculator>) => {
    if (!config?.targetCalculator) {
        return <EditorHelp text={'Velg kalkulator fra listen'} />;
    }

    return (
        <FilteredContent filters={config.filters}>
            <Calculator calculatorData={config.targetCalculator.data} header={config.header} />
        </FilteredContent>
    );
};
