import React from 'react';
import { Kalkulator } from 'components/_common/kalkulator/Kalkulator';
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

export type PartConfigKalkulator = {
    header?: string;
    targetCalculator?: {
        data: CalculatorData;
    };
    filters?: string[];
};

export const KalkulatorPart = ({ config }: PartComponentProps<PartType.Kalkulator>) => {
    if (!config?.targetCalculator) {
        return <EditorHelp text={'Velg kalkulator fra listen'} />;
    }

    return (
        <FilteredContent filters={config.filters}>
            <Kalkulator calculatorData={config.targetCalculator.data} header={config.header} />
        </FilteredContent>
    );
};
