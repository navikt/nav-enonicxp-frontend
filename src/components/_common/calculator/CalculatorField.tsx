import React from 'react';
import { Select, TextField } from '@navikt/ds-react';
import { CalculatorFieldData } from 'types/component-props/parts/calculator';

import style from './Field.module.scss';

const isInputField = (
    field: CalculatorFieldData
): field is {
    inputField: NonNullable<Required<CalculatorFieldData['inputField']>>;
} => !!field.inputField;

const isDropdownField = (
    field: CalculatorFieldData
): field is {
    dropdownField: NonNullable<Required<CalculatorFieldData['dropdownField']>>;
} => !!field.dropdownField;

type Props = {
    field: CalculatorFieldData;
    onChange: (variableName: string, value: string) => void;
    value: number | null;
    autoComplete: boolean;
};

export const CalculatorField = (props: Props) => {
    const { field, onChange, value, autoComplete } = props;

    return (
        <div className={style.calculatorField}>
            {isInputField(field) && (
                <TextField
                    name={field.inputField.variableName}
                    label={field.inputField.label}
                    type="number"
                    value={value?.toString() || ''}
                    onChange={(e) => onChange(field.inputField.variableName, e.currentTarget.value)}
                    autoComplete={autoComplete ? 'on' : 'off'}
                />
            )}
            {isDropdownField(field) && (
                <Select
                    label={field.dropdownField.label}
                    name={field.dropdownField.variableName}
                    onChange={(e) =>
                        onChange(field.dropdownField.variableName, e.currentTarget.value)
                    }
                    value={value || ''}
                    autoComplete={autoComplete ? 'on' : 'off'}
                >
                    {field.dropdownField.optionItems.map((option, index) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            )}
        </div>
    );
};
