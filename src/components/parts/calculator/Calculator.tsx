import React, { FormEvent, useState } from 'react';

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
import { numberToFormattedValue } from 'utils/string';

const bem = BEM('calculator');

export const Calculator = ({ config }: CalculatorProps) => {
    const { data: calculatorData } = config?.targetCalculator;
    const { fields } = calculatorData;
    const useThousandSeparator = calculatorData.useThousandSeparator === 'true';

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

    const getDefaultValues = () => {
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

    const [fieldValues, setFieldValues] = useState<any>(getDefaultValues());
    const [calculatedValue, setCalculatedValue] = useState(null);

    console.log(typeof useThousandSeparator);
    if (!config || !calculatorData) {
        return <div>{'Ingen kalkulatordata tilgjengelig'}</div>;
    }

    const calculationFactory = (variableNames: string[]) => {
        const { calculation } = calculatorData;
        return new Function(...variableNames, calculation);
    };

    const calculateValues = () => {
        const variableNames = Object.keys(fieldValues);
        const variableValues = Object.values(fieldValues);

        const total = calculationFactory(variableNames)(...variableValues);

        setCalculatedValue(total);
    };

    const handleInputChange = (fieldName: string, value: string) => {
        const parsedValue = parseInt(value, 10) || 0;
        setFieldValues({ ...fieldValues, [fieldName]: parsedValue });
    };

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
                                fieldType={getFieldType(field)}
                            />
                        );
                    })}
                <Knapp
                    kompakt
                    htmlType="button"
                    onClick={calculateValues}
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
                                __html: calculatorData.summaryText
                                    .replace('\n', '<br/><br/>')
                                    .replace(
                                        '[result]',
                                        `<strong>${numberToFormattedValue(
                                            calculatedValue,
                                            {
                                                useThousandSeparator,
                                            }
                                        )}</strong>`
                                    ),
                            }}
                        ></div>
                    </Panel>
                )}
            </form>
        </div>
    );
};
