import React from 'react';
import { List, arrayMove } from 'react-movable';
import { GVItem } from './item/GVItem';
import { classNames } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import { Up, Down } from '@navikt/ds-icons';
import { gvServiceReorderItems } from '../../api/services/reorder';

// Some classes are only used in the sorted view
// eslint-disable-next-line css-modules/no-unused-class
import style from './GVItems.module.scss';

export const GVItemsCustomOrder = () => {
    const { valueItems, setValueItems, contentId, setMessages } =
        useGvEditorState();

    const reorderItems = ({ oldIndex, newIndex }) => {
        const newSortedItems = arrayMove(valueItems, oldIndex, newIndex);

        setValueItems(newSortedItems);

        gvServiceReorderItems(
            newSortedItems.map((item) => item.key),
            contentId
        )
            .then((res) => {
                if (res.level === 'error') {
                    throw new Error(res.message.toString());
                }
            })
            .catch((e) => {
                console.error(
                    `Error from reorder request on ${contentId} - ${e}`
                );
                setMessages([
                    {
                        message: `Feil ved omsortering av verdier: ${e}`,
                        level: 'error',
                    },
                ]);
            });
    };

    return (
        <List
            values={valueItems}
            onChange={reorderItems}
            lockVertically={true}
            renderList={({ children, props }) => (
                <div {...props} className={style.gvItems}>
                    {children}
                </div>
            )}
            renderItem={({ value, props, isDragged }) => (
                <div {...props} className={style.itemOuter}>
                    <div
                        className={classNames(
                            style.item,
                            isDragged && style.itemDragged
                        )}
                    >
                        <span
                            data-movable-handle={true}
                            className={style.itemDragHandle}
                        >
                            <Up />
                            <Down />
                        </span>
                        <GVItem item={value} />
                    </div>
                </div>
            )}
        />
    );
};
