/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';

import { CalculatorProps } from 'types/component-props/parts/calculator';
import { Calculator } from 'components/_common/calculator/Calculator';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';

export const CalculatorPart = ({ config }: CalculatorProps) => {
    const { pageConfig } = usePageConfig();

    if (!config?.targetCalculator && pageConfig.editorView) {
        return <div>Velg kalkulator fra listen.</div>;
    }

    if (!config?.targetCalculator && !pageConfig.editorView) {
        return null;
    }

    return (
        <FilteredContent
            filters={config.filters}
            filterLogic={config.filterLogic}
        >
            <Calculator
                calculatorData={config.targetCalculator.data}
                header={config.header}
            />
        </FilteredContent>
    );
};
