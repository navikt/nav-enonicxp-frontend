import React from 'react';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';
import { BEM } from '../../../../../../utils/classnames';
import { GVButton } from '../../button/GVButton';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { useGvEditorState } from '../../../../../../store/hooks/useGvEditorState';
import { gvServiceGetUsage } from '../../../api/services/usage';
import { generateGvUsageMessages } from '../../../utils';
import { BodyShort, Heading } from '@navikt/ds-react';
import { getCaseTimeString } from '../../../../../macros/case-processing-time/MacroSaksbehandlingstid';

const bem = BEM('gv-item');

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
        <div className={bem('display')}>
            <Heading level={'3'} size={'xsmall'}>
                {item.itemName}
            </Heading>
            <BodyShort size={'small'} as={'span'}>
                {'Verdi: '}
            </BodyShort>
            <BodyShort className={bem('value')} as={'span'}>
                {buildValueDisplayString(item)}
            </BodyShort>
        </div>
    );
};

export const GVItem = (props: Props) => {
    const { setMessages, contentId, itemsEditState, setItemEditState } =
        useGvEditorState();

    const { item } = props;

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
