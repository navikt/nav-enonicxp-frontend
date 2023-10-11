import { evaluateExpression } from './MacroGlobalValueWithMath';
import { substituteExpression } from './MacroGlobalValueWithMath';
import { Language } from 'translations';

test('substitution', () => {
    expect(substituteExpression('$1 + $2 * 5', [50, 100])).toEqual(
        '50 + 100 * 5'
    );
});

describe('evaluateExpression', () => {
    test('should evaluate a simple expression', () => {
        const expression = '2 + 2';
        const decimals = 0;
        const variables = [];
        const language: Language = 'no';

        const result = evaluateExpression(
            { expression, decimals, variables },
            language
        );

        expect(result).toEqual('4');
    });

    test('should evaluate an expression with variables', () => {
        const expression = '$1 + $2';
        const decimals = 2;
        const variables = [1.23, 4.56];
        const language: Language = 'no';

        const result = evaluateExpression(
            { expression, decimals, variables },
            language
        );

        expect(result).toEqual('5,79');
    });
});
