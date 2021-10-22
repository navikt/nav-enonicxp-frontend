import React, { useState } from 'react';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVButton } from '../../button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { generateGvUsageMessages } from '../../../utils';
import './GVItem.less';

const bem = BEM('gv-item');

type Props = {
    item: GlobalValueItem;
};

const ItemView = ({ item }: Props) => {
    const { itemName, numberValue } = item;

    return (
        <div className={bem('display')}>
            <div className={classNames(bem('name'))}>{itemName}</div>
            <div className={bem('value-container')}>
                {numberValue !== undefined && (
                    <div>
                        <span className={bem('label')}>{'Tall-verdi: '}</span>
                        <span className={bem('value')}>{numberValue}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export const GVItem = ({ item }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const { setMessages, contentId } = useGvEditorState();

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
                        await gvServiceGetUsage(item.key, contentId)
                            .then((res) =>
                                setMessages(
                                    generateGvUsageMessages(
                                        res.usage,
                                        item.itemName,
                                        res.legacyUsage
                                    )
                                )
                            )
                            .catch((e) =>
                                setMessages([
                                    {
                                        message: `Server-feil : ${e}`,
                                        level: 'error',
                                    },
                                ])
                            );
                    }}
                >
                    {'Vis bruk'}
                </GVButton>
            </div>
        </div>
    );
};
