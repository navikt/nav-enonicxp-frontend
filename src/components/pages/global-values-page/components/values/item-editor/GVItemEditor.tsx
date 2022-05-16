import React, { useEffect, useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { BEM } from '../../../../../../utils/classnames';
import {
    CaseProcessingTimeItem,
    GlobalValueItem,
} from '../../../../../../types/content-props/global-values-props';
import { generateGvUsageMessages, gvNameExists } from '../../../utils';
import { gvServiceAddItem } from '../../../api/services/add';
import { gvServiceModifyItem } from '../../../api/services/modify';
import { gvServiceRemoveItem } from '../../../api/services/remove';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetValueSet } from '../../../api/services/getValueSet';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { BodyShort } from '@navikt/ds-react';
import { GVMessageProps } from '../../messages/GVMessages';
import { GVItemEditorInputCaseTime } from './GVItemEditorInputCaseTime';
import { GVItemEditorInputNumberValue } from './GVItemEditorInputNumberValue';

const bem = BEM('gv-item-editor');

type Props = {
    onClose: () => void;
} & (
    | { item: GlobalValueItem; newType?: undefined }
    | { item?: undefined; newType: GlobalValueItem['type'] }
);

export const GVItemEditor = ({ item, newType, onClose }: Props) => {
    const [inputState, setInputState] = useState<GlobalValueItem>(
        item || newType === 'numberValue'
            ? {
                  type: 'numberValue',
                  key: '',
                  itemName: '',
                  numberValue: '',
              }
            : {
                  type: 'caseTime',
                  key: '',
                  itemName: '',
                  unit: 'months',
                  value: '',
              }
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
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

    const validateAndSubmitItem = (e) => {
        e.preventDefault();

        if (inputState.type === 'numberValue') {
            const inputTrimmed = {
                ...inputState,
                itemName: inputState.itemName?.trim(),
                numberValue:
                    typeof inputState.numberValue === 'string'
                        ? inputState.numberValue.trim()
                        : inputState.numberValue,
            };

            const { itemName, numberValue } = inputTrimmed;

            let hasInputErrors = false;
            const newErrors = {
                itemName: '',
                numberValue: '',
            };

            if (numberValue !== undefined && isNaN(Number(numberValue))) {
                newErrors.numberValue = 'Tall-verdien må være et tall';
                hasInputErrors = true;
            }

            if (numberValue === undefined) {
                newErrors.numberValue = 'Feltet må fylles inn';
                hasInputErrors = true;
            }

            if (!itemName) {
                newErrors.itemName = 'Navn på verdi er påkrevd';
                hasInputErrors = true;
            } else if (gvNameExists(itemName, valueItems, item?.key)) {
                newErrors.itemName = 'Navnet er allerede i bruk i dette settet';
                hasInputErrors = true;
            }

            setErrors(newErrors);

            if (hasInputErrors) {
                return;
            }

            if (newType) {
                gvServiceAddItem(inputTrimmed, contentId)
                    .then((msg) => {
                        onFetchSuccess(msg);
                        updateAndClose();
                    })
                    .catch(onFetchError);
            } else {
                gvServiceModifyItem(inputTrimmed, contentId)
                    .then((msg) => {
                        onFetchSuccess(msg);
                        updateAndClose();
                    })
                    .catch(onFetchError);
            }
        } else {
            const inputTrimmed: CaseProcessingTimeItem = {
                ...inputState,
                itemName: inputState.itemName?.trim(),
                value: inputState.value,
                unit: inputState.unit,
            };

            const { itemName, value, unit } = inputTrimmed;

            let hasInputErrors = false;
            const newErrors = {
                itemName: '',
                value: '',
                unit: '',
            };

            if (value !== undefined && isNaN(Number(value))) {
                newErrors.value = 'Tall-verdien må være et tall';
                hasInputErrors = true;
            }

            if (value === undefined) {
                newErrors.value = 'Feltet må fylles inn';
                hasInputErrors = true;
            }

            if (unit === undefined) {
                newErrors.unit = 'Feltet må fylles inn';
                hasInputErrors = true;
            }

            if (!itemName) {
                newErrors.itemName = 'Navn på verdi er påkrevd';
                hasInputErrors = true;
            } else if (gvNameExists(itemName, valueItems, item?.key)) {
                newErrors.itemName = 'Navnet er allerede i bruk i dette settet';
                hasInputErrors = true;
            }

            setErrors(newErrors);

            if (hasInputErrors) {
                return;
            }

            console.log(newType);
            if (newType) {
                gvServiceAddItem(inputTrimmed, contentId)
                    .then((msg) => {
                        onFetchSuccess(msg);
                        updateAndClose();
                    })
                    .catch(onFetchError);
            } else {
                gvServiceModifyItem(inputTrimmed, contentId)
                    .then((msg) => {
                        onFetchSuccess(msg);
                        updateAndClose();
                    })
                    .catch(onFetchError);
            }
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        const formattedValue =
            name === 'numberValue'
                ? value.replace(' ', '').replace(',', '.')
                : value;
        setInputState({ ...inputState, [name]: formattedValue });
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
                                onClick={validateAndSubmitItem}
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
