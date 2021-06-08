import React, { useState } from 'react';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVButton } from '../../messages/button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import './GVItem.less';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { generateGvUsageMessages } from '../../../utils';

const bem = BEM('gv-item');

type Props = {
    item: GlobalValueItem;
};

const ItemView = ({ item }: Props) => {
    const { itemName, textValue, numberValue, key } = item;

    return (
        <div className={bem('display')}>
            <div className={classNames(bem('name'))}>
                {itemName}
                <span className={bem('key')}>{`(id: ${key})`}</span>
            </div>
            <div className={bem('value')}>{`Tekst-verdi: ${textValue}`}</div>
            {numberValue !== undefined && (
                <div
                    className={bem('value')}
                >{`Tall-verdi: ${numberValue}`}</div>
            )}
        </div>
    );
};

export const GVItem = ({ item }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const { setMessages } = useGvEditorState();

    return (
        <div className={bem()}>
            {editMode ? (
                <GVItemEditor item={item} onClose={() => setEditMode(false)} />
            ) : (
                <ItemView item={item} />
            )}
            <div className={bem('right-buttons')}>
                {!editMode && (
                    <GVButton
                        onClick={(e) => {
                            e.preventDefault();
                            setEditMode(!editMode);
                        }}
                    >
                        {'Endre verdi'}
                    </GVButton>
                )}
                <GVButton
                    onClick={async (e) => {
                        e.preventDefault();
                        const usage = await gvServiceGetUsage(item.key);
                        setMessages(
                            generateGvUsageMessages(usage, item.itemName)
                        );
                    }}
                >
                    {'Vis bruk'}
                </GVButton>
            </div>
        </div>
    );
};
