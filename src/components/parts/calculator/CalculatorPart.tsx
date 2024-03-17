import React from 'react';
import { Calculator } from 'components/_common/calculator/Calculator';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from '../../../types/component-props/parts';

export const CalculatorPart: PartComponent<PartType.Calculator> = ({
    config,
}) => {
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
