import React, { FormEvent, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Button } from '../button/Button';
import { Calculator as CalculatorIcon } from '@navikt/ds-icons';
import { translator } from 'translations';
import classNames from 'classnames';
import { CalculatorField } from 'components/_common/calculator/CalculatorField';
import { CalculatorResult } from './CalculatorResult';
import { usePageConfig } from 'store/hooks/usePageConfig';
import {
    CalculatorData,
    CalculatorFieldData,
    FieldType,
} from 'types/component-props/parts/calculator';

import style from './Calculator.module.scss';

/** Determine field type by looking at which of the field objects (inputField, dropdownField or globalValues)
 * that have variableName.
 */
const getFieldType = (field: CalculatorFieldData): FieldType => {
    const { inputField, dropdownField } = field;

    if (inputField && inputField.variableName) {
        return FieldType.INPUT;
    }

    if (dropdownField && dropdownField.variableName) {
        return FieldType.DROPDOWN;
    }

    return FieldType.GLOBAL_VALUE;
};

/** Fields with global values are not user accessible, but has to be
 * made available to the calculator.
 */
const getGlobalValues = (fields: CalculatorFieldData[]) => {
    return fields.reduce<Record<string, number>>((collection, field) => {
        const variableKey = field.globalValue?.variableName;
        const variableValue = field.globalValue?.value;

        if (variableKey && variableValue !== undefined) {
            collection[variableKey] = variableValue;
        }

        return collection;
    }, {});
};

/** The fields are controlled, so need to create an initial object which will inserted
 * info state useState at startup. Note that global values are not mutable by user, so we
 * can set this as default immediately.
 */
const populateDefaultValues = (fields: CalculatorFieldData[]) => {
    return fields.reduce<Record<string, number | string>>(
        (collection, field) => {
            // Only the actively selected input type at CS will contain a variableName
            // which is why we can do a short circuit eval.
            const variableName =
                field.inputField?.variableName ||
                field.dropdownField?.variableName ||
                field.globalValue?.variableName;

            if (variableName) {
                collection[variableName] = field.globalValue?.value || '';
            }

            return collection;
        },
        {}
    );
};

export const Calculator = ({
    header,
    calculatorData,
}: {
    header?: string;
    calculatorData: CalculatorData;
}) => {
    const { fields, useThousandSeparator } = calculatorData;

    const { language } = usePageConfig();

    const [fieldValues, setFieldValues] = useState<CalculatorFieldData>(
        populateDefaultValues(fields)
    );
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getLabel = translator('calculator', language);

    /* For future reference: Discussed the use of new Function in team:
     * - Looking to get Content Studio validation to avoid use of global objects and methods.
     * - Calculator not sending any information back to Enonic, and all is happening in client.
     * - Doesn't do anything that can't already be done in Console by user.
     * - new Function give access to global scope, not local (unlike "eval")
     */
    const calculationFactory = (variableNames: string[]) => {
        const { calculationScript } = calculatorData;
        try {
            const fn = new Function(...variableNames, calculationScript);
            return fn;
        } catch (error: any) {
            setErrorMessage(`${error.name}: ${error.message}`);

            return () => {
                return null;
            };
        }
    };

    const handleCalculateButtonClick = () => {
        const globalValues = getGlobalValues(fields);
        const allValues = { ...globalValues, ...fieldValues };

        // Separate names and values for injection into calculator function.
        const variableNames = Object.keys(allValues);
        const variableValues = Object.values(allValues);

        // Make sure that calculator script from Enonic only returns numbers.
        let calculated: number | null;
        try {
            calculated = calculationFactory(variableNames)(...variableValues);
            setCalculatedValue(calculated);
            //setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(`${error.name}: ${error.message}`);
            setCalculatedValue(null);
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        const parsedValue = parseInt(value, 10);
        const numericValue = Number.isNaN(parsedValue) ? '' : parsedValue;
        setFieldValues({ ...fieldValues, [fieldName]: numericValue });
    };

    /* Prevent any enter pressing or other means of submitting the form. */
    const handleDefaultFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={classNames(style.calculator, 'calculatorProductMixin')}>
            {header && (
                <Heading level="4" size="medium" className={style.title}>
                    {header}
                </Heading>
            )}
            <form onSubmit={handleDefaultFormSubmit}>
                <div className="calculatorFields">
                    {fields
                        .filter(
                            (field) =>
                                // Don't display global values as an input field.
                                getFieldType(field) !== FieldType.GLOBAL_VALUE
                        )
                        .map((field) => {
                            const fieldKey =
                                field.dropdownField?.variableName ||
                                field.inputField?.variableName;

                            return (
                                <CalculatorField
                                    key={fieldKey}
                                    field={field}
                                    onChange={handleInputChange}
                                    value={fieldValues[fieldKey]}
                                    fieldType={getFieldType(field)}
                                    autoComplete={false}
                                />
                            );
                        })}
                </div>
                <Button
                    size={'small'}
                    onClick={handleCalculateButtonClick}
                    className={style.calculateButton}
                    dsIcon={
                        <CalculatorIcon
                            title={'Kalkulator-ikon'}
                            className={style.calculateIcon}
                        />
                    }
                >
                    <span>{getLabel('calculate')}</span>
                </Button>
                <CalculatorResult
                    sum={calculatedValue}
                    summaryText={calculatorData.summaryText}
                    useThousandSeparator={useThousandSeparator}
                    errorMessage={errorMessage}
                />
            </form>
        </div>
    );
};
