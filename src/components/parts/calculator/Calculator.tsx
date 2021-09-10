import React, { FormEvent, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Calculator as CalculatorIcon } from '@navikt/ds-icons';

import { translator } from 'translations';
import { classNames, BEM } from 'utils/classnames';

import { Field } from './Field';
import { Result } from './Result';

import { usePageConfig } from 'store/hooks/usePageConfig';

import {
    CalculatorField,
    CalculatorProps,
    FieldType,
} from 'types/component-props/parts/calculator';

import './Calculator.less';

const bem = BEM('calculator');

export const Calculator = ({ config }: CalculatorProps) => {
    const { data: calculatorData } = config?.targetCalculator;
    const { fields } = calculatorData;

    const useThousandSeparator = calculatorData.useThousandSeparator === 'true';
    const { language } = usePageConfig();

    const getLabel = translator('calculator', language);

    /** Determine field type by looking at which of the field objects (inputField, dropdownField or globalValues)
     * that have variableName.
     */
    const getFieldType = (field: CalculatorField): FieldType => {
        const { inputField, dropdownField } = field;

        if (inputField && inputField.variableName) {
            return FieldType.INPUT;
        }

        if (dropdownField && dropdownField.variableName) {
            return FieldType.DROPDOWN;
        }

        return FieldType.GLOBAL_VALUE;
    };

    /** The fields are controlled, so need to create an initial object which will inserted
     * info state useState at startup. Note that global values are not mutable by user, so we
     * can set this as default immediately.
     */
    const populateDefaultValues = () => {
        return fields.reduce((collection, field) => {
            // Only the actively selected input type at CS will contain a variableName
            // which is why we can do a short circuit eval.
            const variableName =
                field.inputField?.variableName ||
                field.dropdownField?.variableName ||
                field.globalValue?.variableName;

            return {
                ...collection,
                [variableName]:
                    getFieldType(field) === FieldType.GLOBAL_VALUE
                        ? field.globalValue.value
                        : '',
            };
        }, {});
    };

    const [fieldValues, setFieldValues] = useState<any>(
        populateDefaultValues()
    );
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    if (!config || !calculatorData) {
        return <div>{'Ingen kalkulatordata tilgjengelig'}</div>;
    }

    /** Fields with global values are not user accessible, but has to be
     * made available to the calculator.
     */
    const getGlobalValues = () => {
        return fields.reduce((collection, field) => {
            if (getFieldType(field) === FieldType.GLOBAL_VALUE) {
                return {
                    ...collection,
                    [field.globalValue.variableName]: field.globalValue.value,
                };
            }

            return { ...collection };
        }, {});
    };

    /* For future reference: Discussed the use of new Function in team:
     * - Looking to get Content Studio validation to avoid use of global objects and methods.
     * - Calculator not sending any information back to Enonic, and all is happening in client.
     * - Doesn't do anything that can't already be done in Console by user.
     * - new Function give access to global scope, not local (unlike "eval")
     */
    const calculationFactory = (variableNames: string[]) => {
        const { calculationScript } = calculatorData;
        try {
            /* eslint-disable-next-line */
            const fn = new Function(...variableNames, calculationScript);
            return fn;
        } catch (error) {
            setErrorMessage(`${error.name}: ${error.message}`);
            return () => {
                return null;
            };
        }
    };

    const handleCalculateButtonClick = () => {
        const globalValues = getGlobalValues();
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
        } catch (error) {
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
        <div className={bem()}>
            <form onSubmit={handleDefaultFormSubmit}>
                <div className={classNames(bem('fields'))}>
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
                                <Field
                                    key={fieldKey}
                                    field={field}
                                    onChange={handleInputChange}
                                    value={fieldValues[fieldKey]}
                                    fieldType={getFieldType(field)}
                                />
                            );
                        })}
                </div>
                <Knapp
                    kompakt
                    htmlType="button"
                    onClick={handleCalculateButtonClick}
                    className={classNames(bem('calculateButton'))}
                >
                    <CalculatorIcon
                        className={classNames(bem('calculateIcon'))}
                    />
                    <span>{getLabel('calculate')}</span>
                </Knapp>
                <Result
                    sum={calculatedValue}
                    summaryText={calculatorData.summaryText}
                    useThousandSeparator={useThousandSeparator}
                    errorMessage={errorMessage}
                />
            </form>
        </div>
    );
};
