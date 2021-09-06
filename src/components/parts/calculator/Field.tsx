import { Select, TextField } from '@navikt/ds-react';

import {
    CalculatorField,
    FieldType,
} from 'types/component-props/parts/calculator';

import './Field.less';

interface FieldProps {
    field: CalculatorField;
    onChange: (variableName: string, value: string) => void;
    fieldType: FieldType;
}

export const Field = (props: FieldProps) => {
    const { field, onChange, fieldType } = props;
    const { inputField, dropdownField } = field;

    return (
        <div className="calculatorField">
            {fieldType === FieldType.INPUT && (
                <TextField
                    name={inputField.variableName}
                    label={inputField.label}
                    type="number"
                    onChange={(e) =>
                        onChange(
                            field.inputField.variableName,
                            e.currentTarget.value
                        )
                    }
                />
            )}
            {fieldType === FieldType.DROPDOWN && (
                <Select
                    label={dropdownField.label}
                    name={dropdownField.variableName}
                    onChange={(e) =>
                        onChange(
                            field.dropdownField.variableName,
                            e.currentTarget.value
                        )
                    }
                >
                    {dropdownField.optionItems.map((option, index) => (
                        <option
                            key={`${dropdownField.variableName}-${index}`}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </Select>
            )}
        </div>
    );
};
