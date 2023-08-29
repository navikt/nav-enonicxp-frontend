import React from 'react';
import { List, arrayMove } from 'react-movable';
import { GVItem } from './item/GVItem';
import { classNames } from 'utils/classnames';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { ChevronUpIcon, ChevronDownIcon } from '@navikt/aksel-icons';
import { gvServiceReorderItems } from '../../api/services/reorder';
import { OnChangeMeta } from 'react-movable/lib/types';

import styleCommon from './GVItems.module.scss';
import styleCustomOrder from './GVItemsCustomOrder.module.scss';

export const GVItemsCustomOrder = () => {
    const { valueItems, setValueItems, contentId, setMessages, editorEnabled } =
        useGvEditorState();

    const reorderItems = ({ oldIndex, newIndex }: OnChangeMeta) => {
        const newSortedItems = arrayMove(valueItems, oldIndex, newIndex);

        setValueItems(newSortedItems);

        gvServiceReorderItems(
            newSortedItems.map((item) => item.key),
            contentId
        ).then((res) => {
            if (!res || res.level === 'error') {
                const msg = res?.message?.toString() || 'Ukjent feil';

                console.error(
                    `Error from reorder request on ${contentId} - ${msg}`
                );
                setMessages([
                    {
                        message: `Feil ved omsortering av verdier: ${msg}`,
                        level: 'error',
                    },
                ]);
            }
        });
    };

    return (
        <List
            values={valueItems}
            onChange={reorderItems}
            lockVertically={true}
            renderList={({ children, props }) => (
                <div {...props} className={styleCommon.gvItems}>
                    {children}
                </div>
            )}
            renderItem={({ value, props, isDragged }) => (
                <div {...props} className={styleCommon.itemOuter}>
                    <div
                        className={classNames(
                            styleCommon.item,
                            isDragged && styleCustomOrder.itemDragged
                        )}
                    >
                        <span
                            data-movable-handle={true}
                            className={classNames(
                                styleCustomOrder.itemDragHandle,
                                !editorEnabled && styleCustomOrder.hidden
                            )}
                        >
                            <ChevronUpIcon />
                            <ChevronDownIcon />
                        </span>
                        <GVItem item={value} />
                    </div>
                </div>
            )}
        />
    );
};
