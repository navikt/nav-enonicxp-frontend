import React, { FormEvent, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { CalculatorIcon } from '@navikt/aksel-icons';
import { Button } from 'components/_common/button/Button';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { CalculatorData, CalculatorFieldData } from 'components/parts/kalkulator/KalkulatorPart';
import { KalkulatorField } from './kalkulatorField/KalkulatorField';
import { KalkulatorResultat } from './kalkulatorResultat/KalkulatorResultat';
import style from './Kalkulator.module.scss';

type FieldRecord = Record<string, number | null>;

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
    return fields.reduce<FieldRecord>((collection, field) => {
        // Only the actively selected input type at CS will contain a variableName
        // which is why we can do a short circuit eval.

        const { inputField, dropdownField, globalValue } = field;

        if (globalValue) {
            const { value, variableName } = globalValue;
            if (variableName && value !== undefined) {
                collection[variableName] = value;
            }
            return collection;
        }

        const fieldWithUserInput = inputField || dropdownField;

        if (fieldWithUserInput) {
            const { variableName } = fieldWithUserInput;
            if (variableName) {
                collection[variableName] = null;
            }
        }

        return collection;
    }, {});
};

type Props = {
    header?: string;
    calculatorData: CalculatorData;
};

export const Kalkulator = ({ header, calculatorData }: Props) => {
    const { fields, useThousandSeparator } = calculatorData;

    const { language } = usePageContentProps();

    const [fieldValues, setFieldValues] = useState<FieldRecord>(populateDefaultValues(fields));
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getLabel = translator('calculator', language);

    /* For future reference: Discussed the use of new Function in team:
     * - Looking to get Content Studio validation to avoid use of global objects and methods.
     * - Kalkulator not sending any information back to Enonic, and all is happening in client.
     * - Doesn't do anything that can't already be done in Console by user.
     * - new Function give access to global scope, not local (unlike "eval")
     */
    const calculationFactory = (variableNames: string[]) => {
        const { calculationScript } = calculatorData;
        try {
            return new Function(...variableNames, calculationScript);
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
        try {
            const calculated = calculationFactory(variableNames)(...variableValues);
            setCalculatedValue(calculated);
        } catch (error: any) {
            setErrorMessage(`${error.name}: ${error.message}`);
            setCalculatedValue(null);
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        const parsedValue = parseInt(value, 10);
        const numericValue = Number.isNaN(parsedValue) ? null : parsedValue;
        setFieldValues({ ...fieldValues, [fieldName]: numericValue });
    };

    /* Prevent any enter pressing or other means of submitting the form. */
    const handleDefaultFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={style.kalkulator}>
            {header && (
                <Heading level="4" size="medium" className={style.title}>
                    {header}
                </Heading>
            )}
            <form onSubmit={handleDefaultFormSubmit}>
                <div>
                    {fields
                        .filter((field) => !field.globalValue)
                        .map((field) => {
                            const fieldKey = (field.dropdownField?.variableName ||
                                field.inputField?.variableName) as string;

                            return (
                                <KalkulatorField
                                    key={fieldKey}
                                    field={field}
                                    onChange={handleInputChange}
                                    value={fieldValues[fieldKey]}
                                    autoComplete={false}
                                />
                            );
                        })}
                </div>
                <Button
                    size={'small'}
                    onClick={handleCalculateButtonClick}
                    className={style.calculateButton}
                    dsIcon={<CalculatorIcon aria-hidden className={style.calculateIcon} />}
                >
                    <span>{getLabel('calculate')}</span>
                </Button>
                <KalkulatorResultat
                    sum={calculatedValue}
                    summaryText={calculatorData.summaryText}
                    useThousandSeparator={useThousandSeparator}
                    errorMessage={errorMessage}
                />
            </form>
        </div>
    );
};
