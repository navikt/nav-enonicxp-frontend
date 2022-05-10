import React from 'react';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { GVButton } from '../../button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { generateGvUsageMessages } from '../../../utils';
import { BodyShort, Heading } from '@navikt/ds-react';

import style from './GVItem.module.scss';

type Props = {
    item: GlobalValueItem;
};

const ItemView = ({ item }: Props) => {
    const { itemName, numberValue } = item;

    return (
        <>
            <Heading level={'3'} size={'xsmall'}>
                {itemName}
            </Heading>
            <BodyShort size={'small'} as={'span'}>
                {'Verdi: '}
            </BodyShort>
            <BodyShort className={style.value} as={'span'}>
                {numberValue}
            </BodyShort>
        </>
    );
};

export const GVItem = ({ item }: Props) => {
    const { setMessages, contentId, itemsEditState, setItemEditState } =
        useGvEditorState();
    const { key } = item;
    const editMode = itemsEditState[key];

    return (
        <div className={style.GVItem}>
            {editMode ? (
                <GVItemEditor
                    item={item}
                    onClose={() => setItemEditState(key, false)}
                />
            ) : (
                <ItemView item={item} />
            )}
            <div className={style.rightButtons}>
                {!editMode && (
                    <GVButton
                        onClick={(e) => {
                            e.preventDefault();
                            setItemEditState(key, !editMode);
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
                                        item.itemName
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
