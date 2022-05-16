import React from 'react';
import { Select, TextField } from '@navikt/ds-react';
import {
    CaseProcessingTimeItem,
    CaseProcessingTimeUnit,
} from '../../../../../../types/content-props/global-values-props';

type Props = {
    inputState: CaseProcessingTimeItem;
    errors: Record<keyof CaseProcessingTimeItem, string>;
    setInputState: (inputState: CaseProcessingTimeItem) => void;
};

export const GVItemEditorInputCaseTime = ({
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
                label={'Behandlingstid'}
                name={'value'}
                value={inputState.value ?? ''}
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
                        unit: e.target.value as CaseProcessingTimeUnit,
                    });
                }}
                error={errors.unit}
                value={inputState.unit}
                hideLabel={true}
            >
                <option value={''} disabled={true}>
                    {'Velg tidsenhent'}
                </option>
                <option value={'days'}>{'Dager'}</option>
                <option value={'weeks'}>{'Uker'}</option>
                <option value={'months'}>{'Måneder'}</option>
            </Select>
        </>
    );
};
