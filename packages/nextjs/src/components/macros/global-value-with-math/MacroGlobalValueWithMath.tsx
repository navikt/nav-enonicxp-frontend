import React from 'react';
import jsep, { Expression } from 'jsep';
import { logger } from '@/shared/logger';
import { MacroGlobalValueWithMathProps } from 'types/macro-props/global-value-with-math';
import { usePageContentProps } from 'store/pageContext';
import { Language } from 'translations';
import { formatNumber } from 'utils/math';

type ExpressionProps = MacroGlobalValueWithMathProps['config']['global_value_with_math'];

export function substituteExpression(expression: string, variables: number[]) {
    return expression.replace(/\$(\d+)/g, (_, idx) => {
        const value = variables[parseInt(idx) - 1];
        if (!value) {
            throw new Error(`Invalid variable index: ${idx}`);
        }

        return value.toString();
    });
} // Eks: "$1 + $2 * 5", [50, 100] -> "50 + 100 * 5"

// This approach uses jsep to parse the input into an AST (Abstract Syntax Tree) and
// then recursively evaluates the tree for basic arithmetic operations.
// It's lightweight and doesn't rely on eval(), but it's also limited to the basics.
function evaluateExpressionJSEP(node: Expression): number {
    switch (node.type) {
        case 'BinaryExpression':
            switch (node.operator) {
                case '+':
                    return (
                        evaluateExpressionJSEP(node.left as Expression) +
                        evaluateExpressionJSEP(node.right as Expression)
                    );
                case '-':
                    return (
                        evaluateExpressionJSEP(node.left as Expression) -
                        evaluateExpressionJSEP(node.right as Expression)
                    );
                case '*':
                    return (
                        evaluateExpressionJSEP(node.left as Expression) *
                        evaluateExpressionJSEP(node.right as Expression)
                    );
                case '/':
                    return (
                        evaluateExpressionJSEP(node.left as Expression) /
                        evaluateExpressionJSEP(node.right as Expression)
                    );
                default:
                    throw new Error(`Unsupported operator: ${node.operator}`);
            }
        case 'Literal':
            return Number(node.value);
        default:
            throw new Error(`Unsupported type: ${node.type}`);
    }
}

export const evaluateExpression = (
    { expression, decimals, variables }: ExpressionProps,
    language: Language,
    isEditorView: boolean
) => {
    try {
        const expressionSubstituted = substituteExpression(expression, variables);

        // jsep only accepts . as decimal separator
        const expressionWithDotSeparators = expressionSubstituted.replace(',', '.');

        const parsedExpression = jsep(expressionWithDotSeparators);
        const result = evaluateExpressionJSEP(parsedExpression);
        return formatNumber({
            num: result,
            minDecimals: decimals,
            maxDecimals: decimals,
            language,
        });
    } catch (e) {
        if (isEditorView) {
            return `[feil ved evaluering av uttrykk: ${e}]`;
        }
        logger.error(`Global values calculation error: ${e}`);
        return '[teknisk feil: verdi ikke tilgjengelig]';
    }
};

export const MacroGlobalValueWithMath = ({ config }: MacroGlobalValueWithMathProps) => {
    const { language, editorView } = usePageContentProps();

    if (!config?.global_value_with_math) {
        return null;
    }

    const value = evaluateExpression(config.global_value_with_math, language, !!editorView);

    return <>{value}</>;
};
