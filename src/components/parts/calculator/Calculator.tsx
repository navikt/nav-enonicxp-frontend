import React, { FormEvent, useState, useEffect } from 'react';

import { Knapp } from 'nav-frontend-knapper';
import { Calculator as CalculatorIcon } from '@navikt/ds-icons';
import { classNames, BEM } from 'utils/classnames';

import {
    CalculatorField,
    CalculatorProps,
    FieldType,
} from 'types/component-props/parts/calculator';

import './Calculator.less';
import { Field } from './Field';
import { Panel } from '@navikt/ds-react';
import { insertHTMLBreaks, numberToFormattedValue } from 'utils/string';

const bem = BEM('calculator');

export const Calculator = ({ config }: CalculatorProps) => {
    const [fieldValues, setFieldValues] = useState<any>({});
    const [calculatedValue, setCalculatedValue] = useState(null);

    const { data: calculatorData } = config?.targetCalculator;
    const { fields } = calculatorData;
    const useThousandSeparator = calculatorData.useThousandSeparator === 'true';

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
        const { calculation } = calculatorData;
        return new Function(...variableNames, calculation);
    };

    const handleCalculateButtonClick = () => {
        const globalValues = getGlobalValues();
        const allValues = { ...globalValues, ...fieldValues };

        const variableNames = Object.keys(allValues);
        const variableValues = Object.values(allValues);

        const total = calculationFactory(variableNames)(...variableValues);

        setCalculatedValue(total);
    };

    const handleInputChange = (fieldName: string, value: string) => {
        const parsedValue = parseInt(value, 10) || '';
        setFieldValues({ ...fieldValues, [fieldName]: parsedValue });
    };

    /* Prevent any enter pressing or other means of submitting the form. */
    const handleDefaultFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const buildSummaryHTML = () => {
        const { summaryText } = calculatorData;

        const sumAsHtml = `<strong>${numberToFormattedValue(calculatedValue, {
            useThousandSeparator,
        })}</strong>`;

        return insertHTMLBreaks(summaryText).replace('[result]', sumAsHtml);
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
                    <span>Beregn</span>
                </Knapp>
                {calculatedValue !== null && (
                    <Panel
                        border
                        className={classNames(bem(), bem('summaryText'))}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: buildSummaryHTML(),
                            }}
                        ></div>
                    </Panel>
                )}
            </form>
        </div>
    );
};
