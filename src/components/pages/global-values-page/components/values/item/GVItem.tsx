import React from 'react';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVButton } from '../../button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { generateGvUsageMessages } from '../../../utils';
import './GVItem.less';
import { BodyShort, Heading } from '@navikt/ds-react';

const bem = BEM('gv-item');

type Props = {
    item: GlobalValueItem;
};

const ItemView = ({ item }: Props) => {
    const { itemName, numberValue } = item;

    return (
        <div className={bem('display')}>
            <Heading
                level={'3'}
                size={'small'}
                className={classNames(bem('name'))}
            >
                {itemName}
            </Heading>
            <BodyShort size={'small'} as={'span'}>
                {'Verdi: '}
            </BodyShort>
            <BodyShort className={bem('value')} as={'span'}>
                {numberValue}
            </BodyShort>
        </div>
    );
};

export const GVItem = ({ item }: Props) => {
    const { setMessages, contentId, itemsEditState, setItemEditState } =
        useGvEditorState();

    const { key } = item;

    const editMode = itemsEditState[key];

    return (
        <div className={bem()}>
            {editMode ? (
                <GVItemEditor
                    item={item}
                    onClose={() => setItemEditState(key, false)}
                />
            ) : (
                <ItemView item={item} />
            )}
            <div className={bem('right-buttons')}>
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
