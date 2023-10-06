import { evaluateExpression } from './MacroGlobalValueWithMath';
import { Language } from 'translations';

describe('evaluateExpression', () => {
    describe('evaluateExpression', () => {
        it('should evaluate a simple expression', () => {
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
    });

    it('should evaluate an expression with variables', () => {
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

    it('should handle division by zero', () => {
        const expression = '1 / 0';
        const decimals = 0;
        const variables = [];
        const language: Language = 'no';

        const result = evaluateExpression(
            { expression, decimals, variables },
            language
        );

        expect(result).toEqual('[teknisk feil: verdi ikke tilgjengelig]');
    });

    it('should handle invalid expressions', () => {
        const expression = '2 +';
        const decimals = 0;
        const variables = [];
        const language: Language = 'no';

        const result = evaluateExpression(
            { expression, decimals, variables },
            language
        );

        expect(result).toEqual(
            '[feil ved evaluering av uttrykk: SyntaxError: Unexpected end of input]'
        );
    });
});
