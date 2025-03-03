import React from 'react';
import { Select, TextField } from '@navikt/ds-react';
import { GlobalCaseTimeSetItem, GlobalCaseTimeUnit } from 'types/content-props/global-values-props';

type Errors = { [key in keyof GlobalCaseTimeSetItem]?: string };

export const gvProcessCaseTimeInput = (input: GlobalCaseTimeSetItem) => {
    const processedInput = {
        value: input.value,
        unit: input.unit,
    };

    const errors: Errors = {};

    const { value, unit } = processedInput;

    if (value === undefined) {
        errors.value = 'Feltet må fylles inn';
    } else if (isNaN(Number(value))) {
        errors.value = 'Verdien må være et tall';
    } else if (Number(value) < 0) {
        errors.value = 'Verdien kan ikke være negativ';
    }

    if (unit === undefined) {
        errors.unit = 'Feltet må fylles inn';
    }

    return { processedInput, errors };
};

type Props = {
    inputState: GlobalCaseTimeSetItem;
    errors: Errors;
    setInputState: (inputState: GlobalCaseTimeSetItem) => void;
};

export const GVItemEditorInputCaseTime = ({ inputState, errors, setInputState }: Props) => {
    const inputValue = inputState.value ? inputState.value.toString() : '';

    return (
        <>
            <TextField
                size={'small'}
                label={'Navn'}
                name={'itemName'}
                value={inputState.itemName}
                onChange={(e) => {
                    setInputState({ ...inputState, itemName: e.target.value });
                }}
                error={errors.itemName}
            />
            <TextField
                size={'small'}
                label={'Behandlingstid'}
                name={'value'}
                value={inputValue}
                onChange={(e) => {
                    setInputState({ ...inputState, value: e.target.value });
                }}
                error={errors.value}
                type={'number'}
                min={0}
                max={12}
            />
            <Select
                size={'small'}
                label={'Tidsenhet'}
                onChange={(e) => {
                    setInputState({
                        ...inputState,
                        unit: e.target.value as GlobalCaseTimeUnit,
                    });
                }}
                error={errors.unit}
                value={inputState.unit}
                hideLabel={true}
            >
                <option value={''} disabled={true}>
                    {'Velg tidsenhet'}
                </option>
                <option value={'days'}>{'Dager'}</option>
                <option value={'weeks'}>{'Uker'}</option>
                <option value={'months'}>{'Måneder'}</option>
            </Select>
        </>
    );
};
