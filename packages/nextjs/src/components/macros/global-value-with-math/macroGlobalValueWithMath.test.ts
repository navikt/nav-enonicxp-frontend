import { Language } from 'translations';
import { substituteExpression, evaluateExpression } from './MacroGlobalValueWithMath';

test('substitution', () => {
    expect(substituteExpression('$1 + $2 * 5', [50, 100])).toEqual('50 + 100 * 5');
});

test('dagpenger', () => {
    const expression = '$1 * 6';
    const decimals = 0;
    const variables = [118620];
    const language: Language = 'no';

    const result = evaluateExpression({ expression, decimals, variables }, language, true);

    expect(result).toBe('711\xa0720');
});

test('kompleks matte', () => {
    const expression = '$1 * 6 / 2.545 + 85.744 - 100';
    const decimals = 3;
    const variables = [118620];
    const language: Language = 'no';

    const result = evaluateExpression({ expression, decimals, variables }, language, true);

    expect(result).toBe('279\xa0639,968');
});

test('kompleks matte med paranteser', () => {
    const expression = '$1 * 6 / (2.545 + 85.744)';
    const decimals = 1;
    const variables = [1186201];
    const language: Language = 'nn';

    const result = evaluateExpression({ expression, decimals, variables }, language, true);

    expect(result).toBe('80\xa0612,6');
});

test('should evaluate a simple expression', () => {
    const expression = '2 + 2';
    const decimals = 0;
    const variables: number[] = [];
    const language: Language = 'no';

    const result = evaluateExpression({ expression, decimals, variables }, language, true);

    expect(result).toEqual('4');
});

test('should evaluate an expression with variables', () => {
    const expression = '$1 + $2';
    const decimals = 2;
    const variables = [1.23, 4.56];
    const language: Language = 'no';

    const result = evaluateExpression({ expression, decimals, variables }, language, true);

    expect(result).toEqual('5,79');
});
