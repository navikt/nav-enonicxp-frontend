import React from 'react';
import { MacroGlobalValueWithMathProps } from '../../../types/macro-props/global-value-with-math';
import { create, all } from 'mathjs/lib/esm/number';
import globalState from '../../../globalState';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Language } from 'translations';

import { formatNumber } from '../../../utils/math';

const math = create(all);

type ExpressionProps =
    MacroGlobalValueWithMathProps['config']['global_value_with_math'];

const evaluateExpression = (
    { expression, decimals, variables }: ExpressionProps,
    language: Language
) => {
    try {
        // Map variable values to placeholder names used in the expression ($1, $2, etc...)
        const scope = variables.reduce(
            (acc, variable, index) => ({ ...acc, [`$${index + 1}`]: variable }),
            {}
        );

        // Mathjs only accepts . as decimal separator
        const expressionWithDotSeparators = expression.replace(',', '.');

        const result = math.evaluate(expressionWithDotSeparators, scope);
        return formatNumber(result, decimals, language);
    } catch (e) {
        if (globalState.isEditorView) {
            return `[feil ved evaluering av uttrykk: ${e}]`;
        }
        console.error(`Global values calculation error: ${e}`);
        return '[teknisk feil: verdi ikke tilgjengelig]';
    }
};

export const MacroGlobalValueWithMath = ({
    config,
}: MacroGlobalValueWithMathProps) => {
    const { language } = usePageConfig();

    if (!config?.global_value_with_math) {
        return null;
    }

    const value = evaluateExpression(config.global_value_with_math, language);

    return <>{value}</>;
};
