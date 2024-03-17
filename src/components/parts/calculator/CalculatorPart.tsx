import React from 'react';
import { Calculator } from 'components/_common/calculator/Calculator';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const CalculatorPart = ({
    config,
}: PartComponentProps<PartType.Calculator>) => {
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
