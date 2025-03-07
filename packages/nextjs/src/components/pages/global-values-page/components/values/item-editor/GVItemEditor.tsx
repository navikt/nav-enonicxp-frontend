import React, { useEffect, useState } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { GVButton } from 'components/pages/global-values-page/components/button/GVButton';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { generateGvUsageMessages, gvNameExists } from 'components/pages/global-values-page/utils';
import { gvServiceAddItem } from 'components/pages/global-values-page/api/services/add';
import { gvServiceModifyItem } from 'components/pages/global-values-page/api/services/modify';
import { gvServiceRemoveItem } from 'components/pages/global-values-page/api/services/remove';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { gvServiceGetValueSet } from 'components/pages/global-values-page/api/services/getValueSet';
import { gvServiceGetUsage } from 'components/pages/global-values-page/api/services/usage';
import { GVMessageProps } from 'components/pages/global-values-page/components/messages/GVMessages';
import {
    GVItemEditorInputCaseTime,
    gvProcessCaseTimeInput,
} from './case-time/GVItemEditorInputCaseTime';
import {
    GVItemEditorInputNumberValue,
    gvProcessNumberValueInput,
} from './number-value/GVItemEditorInputNumberValue';

import style from './GVItemEditor.module.scss';

type Errors = {
    [key in keyof GlobalValueItem]?: string;
};

type Props = {
    onClose: () => void;
} & (
    | { item: GlobalValueItem; newType?: undefined }
    | { item?: undefined; newType: GlobalValueItem['type'] }
);

const defaultInputState: { [key in GlobalValueItem['type']]: GlobalValueItem } = {
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
    const [inputState, setInputState] = useState<GlobalValueItem | null>(
        item || (newType ? defaultInputState[newType] : null)
    );
    const [errors, setErrors] = useState<Errors>({});
    const [awaitDeleteConfirm, setAwaitDeleteConfirm] = useState(false);

    useEffect(() => {
        if (item) {
            setInputState(item);
        }
    }, [item]);

    const { valueItems, contentId, setValueItems, setMessages } = useGvEditorState();

    const onFetchError = (e: any) => {
        setMessages([{ message: `Server-feil: ${e}`, level: 'error' }]);
    };

    const onFetchSuccess = (msg?: GVMessageProps | void) => {
        if (msg && msg.level !== 'info') {
            setMessages([msg]);
        }
    };

    const updateAndClose = () => {
        onClose?.();
        gvServiceGetValueSet(contentId).then((res) => res?.items && setValueItems(res.items));
    };

    const deleteItem = async () => {
        if (!item) {
            return;
        }

        await gvServiceGetUsage(item.key, contentId).then((res) => {
            const usage = res?.usage;
            if (!usage) {
                setMessages([
                    {
                        message: 'Server-feil ved uthenting av verdier',
                        level: 'error',
                    },
                ]);
                return;
            }

            if (usage.length > 0) {
                setMessages(generateGvUsageMessages(usage, item.itemName));
                setTimeout(() => setAwaitDeleteConfirm(true), 1000);
            } else {
                deleteConfirm();
            }
        });
    };

    const deleteConfirm = () => {
        if (!item) {
            return;
        }

        setAwaitDeleteConfirm(false);
        gvServiceRemoveItem(item, contentId).then((res) => {
            if (!res) {
                return onFetchError('Ukjent server-feil');
            }
            onFetchSuccess(res);
            updateAndClose();
        });
    };

    const deleteCancel = () => {
        setAwaitDeleteConfirm(false);
    };

    const validateAndSubmitItem = () => {
        if (!inputState) {
            return;
        }

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
            gvServiceAddItem(finalInput, contentId).then((msg) => {
                if (!msg) {
                    return onFetchError('Ukjent server-feil');
                }
                onFetchSuccess(msg);
                updateAndClose();
            });
        } else {
            gvServiceModifyItem(finalInput, contentId).then((msg) => {
                if (!msg) {
                    return onFetchError('Ukjent server-feil');
                }
                onFetchSuccess(msg);
                updateAndClose();
            });
        }
    };

    return (
        <div className={style.gvItemEditor}>
            <form className={style.form}>
                {inputState?.type === 'numberValue' && (
                    <GVItemEditorInputNumberValue
                        inputState={inputState}
                        errors={errors}
                        setInputState={setInputState}
                    />
                )}
                {inputState?.type === 'caseTime' && (
                    <GVItemEditorInputCaseTime
                        inputState={inputState}
                        errors={errors}
                        setInputState={setInputState}
                    />
                )}
                <div className={style.formButtons}>
                    {awaitDeleteConfirm ? (
                        <>
                            <BodyShort className={style.deleteConfirmMsg}>
                                {'Obs: Denne verdien kan være i bruk - er du sikker?'}
                            </BodyShort>
                            <GVButton variant={'danger'} onClick={deleteConfirm}>
                                {'Bekreft sletting'}
                            </GVButton>
                            <GVButton variant={'secondary'} onClick={deleteCancel}>
                                {'Avbryt sletting'}
                            </GVButton>
                        </>
                    ) : (
                        <>
                            <GVButton variant={'primary'} onClick={validateAndSubmitItem}>
                                {'Lagre verdi'}
                            </GVButton>
                            <GVButton variant={'primary'} onClick={onClose}>
                                {'Avbryt'}
                            </GVButton>
                            {!newType && (
                                <GVButton variant={'danger'} onClick={deleteItem}>
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
