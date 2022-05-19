import React from 'react';
import { TextField } from '@navikt/ds-react';
import { GlobalNumberValueItem } from '../../../../../../../types/content-props/global-values-props';

type Errors = { [key in keyof GlobalNumberValueItem]?: string };

export const gvProcessNumberValueInput = (input: GlobalNumberValueItem) => {
    const processedInput = {
        numberValue:
            typeof input.numberValue === 'string'
                ? input.numberValue.trim()
                : input.numberValue,
    };

    const { numberValue } = processedInput;

    const errors: Errors = {};

    if (numberValue === undefined) {
        errors.numberValue = 'Feltet må fylles inn';
    } else if (isNaN(Number(numberValue))) {
        errors.numberValue = 'Verdien må være et tall';
    }

    return { processedInput, errors };
};

type Props = {
    inputState: GlobalNumberValueItem;
    errors: Errors;
    setInputState: (inputState: GlobalNumberValueItem) => void;
};

export const GVItemEditorInputNumberValue = ({
    inputState,
    errors,
    setInputState,
}: Props) => {
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
                label={'Tallverdi'}
                name={'numberValue'}
                value={inputState.numberValue ?? ''}
                onChange={(e) => {
                    setInputState({
                        ...inputState,
                        numberValue: Number(e.target.value),
                    });
                }}
                error={errors.numberValue}
                type={'number'}
            />
        </>
    );
};
