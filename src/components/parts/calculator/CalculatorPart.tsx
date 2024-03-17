import React from 'react';
import { CalculatorProps } from '../../../types/component-props/part-configs/calculator';
import { Calculator } from 'components/_common/calculator/Calculator';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const CalculatorPart = ({ config }: CalculatorProps) => {
    if (!config?.targetCalculator) {
        return <EditorHelp text={'Velg kalkulator fra listen'} />;
    }

    return (
        <FilteredContent filters={config.filters}>
            <Calculator
                calculatorData={config.targetCalculator.data}
                header={config.header}
            />
        </FilteredContent>
    );
};
