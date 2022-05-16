import React, { useEffect, useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { BEM } from '../../../../../../utils/classnames';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { generateGvUsageMessages, gvNameExists } from '../../../utils';
import { gvServiceAddItem } from '../../../api/services/add';
import { gvServiceModifyItem } from '../../../api/services/modify';
import { gvServiceRemoveItem } from '../../../api/services/remove';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetValueSet } from '../../../api/services/getValueSet';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { BodyShort } from '@navikt/ds-react';
import { GVMessageProps } from '../../messages/GVMessages';
import {
    GVItemEditorInputCaseTime,
    gvProcessCaseTimeInput,
} from './case-time/GVItemEditorInputCaseTime';
import {
    GVItemEditorInputNumberValue,
    gvProcessNumberValueInput,
} from './number-value/GVItemEditorInputNumberValue';

const bem = BEM('gv-item-editor');

type Errors = {
    [key in keyof GlobalValueItem]?: string;
};

type Props = {
    onClose: () => void;
} & (
    | { item: GlobalValueItem; newType?: undefined }
    | { item?: undefined; newType: GlobalValueItem['type'] }
);

const defaultInputState: { [key in GlobalValueItem['type']]: GlobalValueItem } =
    {
        numberValue: {
            type: 'numberValue',
            key: '',
            itemName: '',
            numberValue: '',
        },
        caseTime: {
            type: 'caseTime',
            key: '',
            itemName: '',
            unit: 'months',
            value: '',
        },
    };

export const GVItemEditor = ({ item, newType, onClose }: Props) => {
    const [inputState, setInputState] = useState<GlobalValueItem>(
        item || defaultInputState[newType]
    );
    const [errors, setErrors] = useState<Errors>({});
    const [awaitDeleteConfirm, setAwaitDeleteConfirm] = useState(false);

    useEffect(() => {
        if (item) {
            setInputState(item);
        }
    }, [item]);

    const { valueItems, contentId, setValueItems, setMessages } =
        useGvEditorState();

    const onFetchError = (e) => {
        setMessages([{ message: `Server-feil: ${e}`, level: 'error' }]);
    };

    const onFetchSuccess = (msg?: GVMessageProps | void) => {
        if (msg && msg.level !== 'info') {
            setMessages([msg]);
        }
    };

    const updateAndClose = () => {
        onClose?.();
        gvServiceGetValueSet(contentId).then(
            (res) => res?.items && setValueItems(res.items)
        );
    };

    const deleteItem = async () => {
        await gvServiceGetUsage(item.key, contentId)
            .then((res) => {
                const usage = res?.usage;
                if (!usage || usage.length > 0) {
                    setMessages(generateGvUsageMessages(usage, item.itemName));
                    setTimeout(() => setAwaitDeleteConfirm(true), 1000);
                } else {
                    deleteConfirm();
                }
            })
            .catch((e) =>
                setMessages([
                    {
                        message: `Server-feil : ${e}`,
                        level: 'error',
                    },
                ])
            );
    };

    const deleteConfirm = () => {
        setAwaitDeleteConfirm(false);
        gvServiceRemoveItem(item, contentId)
            .then((res) => {
                onFetchSuccess(res);
                updateAndClose();
            })
            .catch(onFetchError);
    };

    const deleteCancel = () => {
        setAwaitDeleteConfirm(false);
    };

    const validateAndSubmitItem = () => {
        const commonProcessedInput = {
            ...inputState,
            itemName: inputState.itemName?.trim(),
        };

        const commonErrors: Errors = {};

        const { itemName } = commonProcessedInput;

        if (!itemName) {
            commonErrors.itemName = 'Navn på verdi er påkrevd';
        } else if (gvNameExists(itemName, valueItems, item?.key)) {
            commonErrors.itemName = 'Navnet er allerede i bruk i dette settet';
        }

        const { processedInput, errors } =
            inputState.type === 'caseTime'
                ? gvProcessCaseTimeInput(inputState)
                : gvProcessNumberValueInput(inputState);

        const finalErrors = { ...commonErrors, ...errors };

        setErrors(finalErrors);

        if (Object.keys(finalErrors).length > 0) {
            return;
        }

        const finalInput = { ...commonProcessedInput, ...processedInput };

        if (newType) {
            gvServiceAddItem(finalInput, contentId)
                .then((msg) => {
                    onFetchSuccess(msg);
                    updateAndClose();
                })
                .catch(onFetchError);
        } else {
            gvServiceModifyItem(finalInput, contentId)
                .then((msg) => {
                    onFetchSuccess(msg);
                    updateAndClose();
                })
                .catch(onFetchError);
        }
    };

    return (
        <div className={bem()}>
            <form className={bem('form')}>
                {inputState.type === 'numberValue' && (
                    <GVItemEditorInputNumberValue
                        inputState={inputState}
                        errors={errors}
                        setInputState={setInputState}
                    />
                )}
                {inputState.type === 'caseTime' && (
                    <GVItemEditorInputCaseTime
                        inputState={inputState}
                        errors={errors}
                        setInputState={setInputState}
                    />
                )}
                <div className={bem('form-buttons')}>
                    {awaitDeleteConfirm ? (
                        <>
                            <BodyShort className={bem('delete-confirm-msg')}>
                                {
                                    'Obs: Denne verdien kan være i bruk - er du sikker?'
                                }
                            </BodyShort>
                            <GVButton
                                variant={'danger'}
                                onClick={deleteConfirm}
                            >
                                {'Bekreft sletting'}
                            </GVButton>
                            <GVButton
                                variant={'secondary'}
                                onClick={deleteCancel}
                            >
                                {'Avbryt sletting'}
                            </GVButton>
                        </>
                    ) : (
                        <>
                            <GVButton
                                variant={'primary'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    validateAndSubmitItem();
                                }}
                            >
                                {'Lagre verdi'}
                            </GVButton>
                            <GVButton
                                variant={'primary'}
                                onClick={() => onClose()}
                            >
                                {'Avbryt'}
                            </GVButton>
                            {!newType && (
                                <GVButton
                                    variant={'danger'}
                                    onClick={deleteItem}
                                >
                                    {'Slett'}
                                </GVButton>
                            )}
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};
