import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { BEM } from '../../../../../utils/classnames';
import { GlobalValueItem } from '../../../../../types/content-props/global-values-props';
import './GVItemEditor.less';
import { nameExists } from '../../utils';
import { gvServiceAddItem } from '../../api/addItem';
import { useRouter } from 'next/router';
import { gvServiceGetKeyUsage } from '../../api/checkKeyUsage';
import { gvServiceModifyItem } from '../../api/modifyItem';

const bem = BEM('gv-item-editor');

type Props = {
    allItems: GlobalValueItem[];
    contentId: string;
    item?: GlobalValueItem;
    onFinish?: () => void;
};

export const GVItemEditor = ({
    allItems,
    contentId,
    item = { itemName: '', textValue: '', key: '' },
    onFinish,
}: Props) => {
    const [inputState, setInputState] = useState(item);
    const [errors, setErrors] = useState({
        itemName: '',
        textValue: '',
        numberValue: '',
    });
    const { reload } = useRouter();

    const isNewItem = item.key === '';

    const validateAndSubmit = (e) => {
        e.preventDefault();
        console.log(inputState);
        const { itemName, numberValue, textValue } = inputState;

        let hasInputErrors = false;
        const newErrors = {
            itemName: '',
            textValue: '',
            numberValue: '',
        };

        if (numberValue !== undefined && isNaN(numberValue)) {
            console.log('Number error');
            newErrors.numberValue = 'Tall-verdien er ikke et tall';
            hasInputErrors = true;
        } else {
            newErrors.numberValue = '';
        }

        if (!textValue) {
            newErrors.textValue = 'Tekst-verdi er påkrevd';
            hasInputErrors = true;
        } else {
            newErrors.textValue = '';
        }

        console.log(nameExists(itemName, allItems), itemName, allItems);

        if (!itemName) {
            newErrors.itemName = 'Navn på verdi er påkrevd';
            hasInputErrors = true;
        } else if (nameExists(itemName, allItems, item.key)) {
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
                    reload();
                })
                .catch((e) => console.log(`Fail add! ${e}`));
        } else {
            gvServiceModifyItem(inputState, contentId)
                .then((res) => {
                    console.log(`Success mod! ${res}`);
                    reload();
                })
                .catch((e) => console.log(`Fail mod! ${e}`));
        }
    };

    const handleInput = (e) => {
        const { name } = e.target;
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const deleteItem = () => {
        gvServiceGetKeyUsage(item.key);
        console.log('deleterinos');
    };

    return (
        <div className={bem()}>
            <form onSubmit={validateAndSubmit}>
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
                        value={inputState.numberValue || ''}
                        onChange={handleInput}
                        feil={errors.numberValue}
                    />
                    <div className={bem('form-buttons')}>
                        <GVButton type={'hoved'} htmlType={'submit'}>
                            {'Lagre verdi'}
                        </GVButton>
                        <GVButton
                            type={'hoved'}
                            htmlType={'reset'}
                            onClick={() => onFinish()}
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
                    </div>
                </SkjemaGruppe>
            </form>
        </div>
    );
};
