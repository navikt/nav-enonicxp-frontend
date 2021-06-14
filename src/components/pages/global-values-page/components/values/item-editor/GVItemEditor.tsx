import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { BEM } from '../../../../../../utils/classnames';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { generateGvUsageMessages, gvNameExists } from '../../../utils';
import { gvServiceAddItem } from '../../../api/services/add';
import { gvServiceModifyItem } from '../../../api/services/modify';
import { gvServiceRemoveItem } from '../../../api/services/remove';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetValueSet } from '../../../api/services/getValueSet';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { Element } from 'nav-frontend-typografi';
import './GVItemEditor.less';

const bem = BEM('gv-item-editor');

type Props = {
    item?: GlobalValueItem;
    onClose?: () => void;
};

export const GVItemEditor = ({
    item = { itemName: '', textValue: '', key: '' },
    onClose,
}: Props) => {
    const [inputState, setInputState] = useState(item);
    const [errors, setErrors] = useState({
        itemName: '',
        textValue: '',
        numberValue: '',
    });
    const [awaitDeleteConfirm, setAwaitDeleteConfirm] = useState(false);

    const {
        valueItems,
        contentId,
        setValueItems,
        setMessages,
    } = useGvEditorState();

    const isNewItem = item.key === '';

    const updateAndClose = () => {
        onClose?.();
        gvServiceGetValueSet(contentId).then(
            (res) => res?.items && setValueItems(res.items)
        );
    };

    const deleteItem = async () => {
        const usage = await gvServiceGetUsage(item.key);
        if (!usage || usage.length > 0) {
            setMessages(generateGvUsageMessages(usage, item.itemName));
            setAwaitDeleteConfirm(true);
        } else {
            deleteConfirm();
        }
    };

    const deleteConfirm = () => {
        setAwaitDeleteConfirm(false);
        gvServiceRemoveItem(item, contentId).then(() => updateAndClose());
    };

    const deleteCancel = () => {
        setAwaitDeleteConfirm(false);
    };

    const validateAndSubmitItem = (e) => {
        e.preventDefault();
        const { itemName, numberValue, textValue } = inputState;

        let hasInputErrors = false;
        const newErrors = {
            itemName: '',
            textValue: '',
            numberValue: '',
        };

        if (numberValue !== undefined && isNaN(numberValue)) {
            newErrors.numberValue = 'Tall-verdien må være et tall';
            hasInputErrors = true;
        } else {
            newErrors.numberValue = '';
        }

        if (!textValue && numberValue === undefined) {
            newErrors.textValue = 'Minst ett av verdi-feltene må fylles inn';
            newErrors.numberValue = 'Minst ett av verdi-feltene må fylles inn';
            hasInputErrors = true;
        } else {
            newErrors.textValue = '';
        }

        if (!itemName) {
            newErrors.itemName = 'Navn på verdi er påkrevd';
            hasInputErrors = true;
        } else if (gvNameExists(itemName, valueItems, item.key)) {
            newErrors.itemName = 'Navnet er allerede i bruk i dette settet';
            hasInputErrors = true;
        } else {
            newErrors.itemName = '';
        }

        setErrors(newErrors);

        if (hasInputErrors) {
            return;
        }

        if (isNewItem) {
            gvServiceAddItem(inputState, contentId)
                .then((res) => {
                    console.log(`Success add! ${res}`);
                    updateAndClose();
                })
                .catch((e) => console.log(`Fail add! ${e}`));
        } else {
            gvServiceModifyItem(inputState, contentId)
                .then((res) => {
                    console.log(`Success mod! ${res}`);
                    updateAndClose();
                })
                .catch((e) => console.log(`Fail mod! ${e}`));
        }
    };

    const handleInput = (e) => {
        const { name } = e.target;
        setInputState({ ...inputState, [name]: e.target.value });
    };

    return (
        <div className={bem()}>
            <form onSubmit={validateAndSubmitItem}>
                <SkjemaGruppe>
                    <Input
                        mini
                        label={'Navn'}
                        name={'itemName'}
                        value={inputState.itemName}
                        onChange={handleInput}
                        feil={errors.itemName}
                    />
                    <Input
                        mini
                        label={'Tekst-verdi (vises ved bruk i tekst-innhold)'}
                        name={'textValue'}
                        value={inputState.textValue}
                        onChange={handleInput}
                        feil={errors.textValue}
                    />
                    <Input
                        mini
                        label={
                            'Tall-verdi (valgfritt - for bruk i kommende kalkulator-komponenter)'
                        }
                        name={'numberValue'}
                        value={
                            inputState.numberValue !== undefined
                                ? inputState.numberValue
                                : ''
                        }
                        onChange={handleInput}
                        feil={errors.numberValue}
                    />
                    <div className={bem('form-buttons')}>
                        {awaitDeleteConfirm ? (
                            <>
                                <Element className={bem('delete-confirm-msg')}>
                                    {
                                        'Obs: Denne verdien kan være i bruk - er du sikker?'
                                    }
                                </Element>
                                <GVButton
                                    type={'fare'}
                                    htmlType={'button'}
                                    onClick={deleteConfirm}
                                >
                                    {'Bekreft sletting'}
                                </GVButton>
                                <GVButton
                                    type={'standard'}
                                    htmlType={'button'}
                                    onClick={deleteCancel}
                                >
                                    {'Avbryt sletting'}
                                </GVButton>
                            </>
                        ) : (
                            <>
                                <GVButton type={'hoved'} htmlType={'submit'}>
                                    {'Lagre verdi'}
                                </GVButton>
                                <GVButton
                                    type={'hoved'}
                                    htmlType={'reset'}
                                    onClick={() => onClose()}
                                >
                                    {'Avbryt'}
                                </GVButton>
                                {!isNewItem && (
                                    <GVButton
                                        type={'fare'}
                                        htmlType={'button'}
                                        onClick={deleteItem}
                                    >
                                        {'Slett'}
                                    </GVButton>
                                )}
                            </>
                        )}
                    </div>
                </SkjemaGruppe>
            </form>
        </div>
    );
};
