import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { GVButton } from 'components/pages/global-values-page/components/button/GVButton';
import { GVItemEditor } from 'components/pages/global-values-page/components/values/item-editor/GVItemEditor';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { gvServiceGetUsage } from 'components/pages/global-values-page/api/services/usage';
import { generateGvUsageMessages } from 'components/pages/global-values-page/utils';
import { getCaseTimeString } from 'components/macros/saksbehandlingstid/MacroSaksbehandlingstid';

import style from './GVItem.module.scss';

type Props = {
    item: GlobalValueItem;
};

const buildValueDisplayString = (item: GlobalValueItem) => {
    switch (item.type) {
        case 'numberValue':
            return item.numberValue;
        case 'caseTime':
            return getCaseTimeString(item.value, item.unit, 'no');
        default:
            return `Ukjent verditype: ${(item as unknown as any).type}`;
    }
};

const ItemView = ({ item }: Props) => {
    return (
        <div>
            <Heading level={'3'} size={'xsmall'}>
                {item.itemName}
            </Heading>
            <BodyShort size={'small'} as={'span'}>
                {'Verdi: '}
            </BodyShort>
            <BodyShort className={style.value} as={'span'}>
                {buildValueDisplayString(item)}
            </BodyShort>
        </div>
    );
};

export const GVItem = (props: Props) => {
    const { setMessages, contentId, itemsEditState, setItemEditState, editorEnabled } =
        useGvEditorState();
    const { item } = props;
    const { key } = item;
    const editMode = itemsEditState[key];

    return (
        <div className={style.gvItem}>
            {editMode ? (
                <GVItemEditor item={item} onClose={() => setItemEditState(key, false)} />
            ) : (
                <ItemView item={item} />
            )}
            <div className={style.rightButtons}>
                {!editMode && editorEnabled && (
                    <GVButton
                        onClick={() => {
                            setItemEditState(key, !editMode);
                        }}
                    >
                        {'Endre verdi'}
                    </GVButton>
                )}
                <GVButton
                    onClick={async () => {
                        await gvServiceGetUsage(item.key, contentId).then((res) => {
                            if (!res) {
                                setMessages([
                                    {
                                        message: 'Server-feil ved uthenting av verdier',
                                        level: 'error',
                                    },
                                ]);
                                return;
                            }

                            setMessages(generateGvUsageMessages(res.usage, item.itemName));
                        });
                    }}
                >
                    {'Vis bruk'}
                </GVButton>
            </div>
        </div>
    );
};
