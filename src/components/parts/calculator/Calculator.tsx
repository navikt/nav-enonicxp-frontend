import React, { FormEvent, useState, useEffect } from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Calculator as CalculatorIcon } from '@navikt/ds-icons';
import { classNames, BEM } from 'utils/classnames';
import { translator } from 'translations';
import { Field } from './Field';
import { usePageConfig } from 'store/hooks/usePageConfig';

import {
    CalculatorField,
    CalculatorProps,
    FieldType,
} from 'types/component-props/parts/calculator';

import { Result } from './Result';
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

    const populateDefaultValues = () => {
        return fields.reduce((collection, field) => {
            const variableName =
                field.inputField.variableName ||
                field.dropdownField.variableName ||
                field.globalValue.variableName;

            return {
                ...collection,
                [variableName]:
                    getFieldType(field) === FieldType.GLOBAL_VALUE
                        ? field.globalValue.value
                        : '',
            };
        });
    };

    const [fieldValues, setFieldValues] = useState<any>(
        populateDefaultValues()
    );
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!fields) {
            return;
        }

        const values = fields.reduce((collection, field) => {
            if (getFieldType(field) === FieldType.GLOBAL_VALUE) {
                return {
                    ...collection,
                    [field.globalValue.variableName]: field.globalValue.value,
                };
            }

            const variableName =
                field.dropdownField?.variableName ||
                field.inputField?.variableName;

            return { ...collection, [variableName]: '' };
        }, {});

        setFieldValues(values);
    }, [fields]);

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

    /* Returns a function based on the incoming calculation script */
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
        const parsedValue = parseInt(value, 10) || '';
        setFieldValues({ ...fieldValues, [fieldName]: parsedValue });
    };

    /* Prevent any enter pressing or other means of submitting the form. */
    const handleDefaultFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={bem()}>
            <form onSubmit={handleDefaultFormSubmit}>
                {fields
                    .filter(
                        (field) =>
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
                <Knapp
                    kompakt
                    htmlType="button"
                    onClick={handleCalculateButtonClick}
                    className={classNames(bem(), bem('calculateButton'))}
                >
                    <CalculatorIcon
                        className={classNames(bem(), bem('calculateIcon'))}
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
