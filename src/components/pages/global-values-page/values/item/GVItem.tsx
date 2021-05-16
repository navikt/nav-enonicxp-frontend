import React, { useState } from 'react';
import { GlobalValueItem } from '../../../../../types/content-props/global-values-props';
import { BEM, classNames } from '../../../../../utils/classnames';
import './GVItem.less';
import { gvServiceGetUsage } from '../../api/services/usage';
import { GVButton } from '../../button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';

const bem = BEM('gv-item');

const ItemName = ({
    itemName,
    itemKey,
}: {
    itemName: string;
    itemKey: string;
}) => {
    return (
        <div className={classNames(bem('name'))}>
            {itemName}
            <span className={bem('key')}>{`(id: ${itemKey})`}</span>
        </div>
    );
};

const ItemValues = ({
    textValue,
    numberValue,
}: {
    textValue: string;
    numberValue?: number;
}) => {
    return (
        <>
            <div className={bem('value')}>{`Tekst-verdi: ${textValue}`}</div>
            {numberValue !== undefined && (
                <div
                    className={bem('value')}
                >{`Tall-verdi: ${numberValue}`}</div>
            )}
        </>
    );
};

const ItemView = ({ item }: { item: GlobalValueItem }) => {
    const { itemName, textValue, numberValue, key } = item;

    return (
        <div className={bem('display')}>
            <ItemName itemName={itemName} itemKey={key} />
            <ItemValues textValue={textValue} numberValue={numberValue} />
        </div>
    );
};

type Props = {
    item: GlobalValueItem;
    contentId: string;
    allItems: GlobalValueItem[];
};

export const GVItem = ({ item, contentId, allItems }: Props) => {
    const { key } = item;

    const [editMode, setEditMode] = useState(false);

    return (
        <div className={bem()}>
            {editMode ? (
                <GVItemEditor
                    item={item}
                    contentId={contentId}
                    allItems={allItems}
                    onFinish={() => setEditMode(false)}
                />
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
                    onClick={(e) => {
                        e.preventDefault();
                        gvServiceGetUsage(key).then((res) => {
                            if (!res?.usage) {
                                console.log('Service error');
                                return;
                            }

                            if (res.usage.length === 0) {
                                console.log('Key not in use');
                            } else {
                                console.log('Key is in use!', res);
                            }
                        });
                    }}
                >
                    {'Vis bruk'}
                </GVButton>
            </div>
        </div>
    );
};
