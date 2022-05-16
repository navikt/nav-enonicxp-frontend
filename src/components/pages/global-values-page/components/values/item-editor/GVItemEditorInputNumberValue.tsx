import React from 'react';
import { TextField } from '@navikt/ds-react';
import { GlobalNumberValueItem } from '../../../../../../types/content-props/global-values-props';

type Props = {
    inputState: GlobalNumberValueItem;
    errors: Record<keyof GlobalNumberValueItem, string>;
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
                        numberValue: e.target.value,
                    });
                }}
                error={errors.numberValue}
                type={'number'}
            />
        </>
    );
};
