import React from 'react';
import { List, arrayMove } from 'react-movable';
import { GVItem } from './item/GVItem';
import { BEM, classNames } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import { Up, Down } from '@navikt/ds-icons';
import { gvServiceReorderItems } from '../../api/services/reorder';
import './GVItems.less';

const bem = BEM('gv-items');

const ReorderIcon = () => (
    <span data-movable-handle={true} className={bem('drag-handle')}>
        <Up />
        <Down />
    </span>
);

export const GVItemsOrdered = () => {
    const { valueItems, setValueItems, contentId } = useGvEditorState();

    const reorderItems = ({ oldIndex, newIndex }) => {
        const newSortedItems = arrayMove(valueItems, oldIndex, newIndex);

        setValueItems(newSortedItems);

        gvServiceReorderItems(
            newSortedItems.map((item) => item.key),
            contentId
        )
            .then((res) =>
                console.log(
                    `Response from reorder request on ${contentId} - ${res.message}`
                )
            )
            .catch((e) =>
                console.error(
                    `Error from reorder request on ${contentId} - ${e}`
                )
            );
    };

    return (
        <List
            values={valueItems}
            onChange={reorderItems}
            lockVertically={true}
            renderList={({ children, props }) => (
                <div {...props} className={bem()}>
                    {children}
                </div>
            )}
            renderItem={({ value, props, isDragged }) => {
                return (
                    <div
                        {...props}
                        className={classNames(
                            bem('item'),
                            isDragged && bem('item', 'dragged')
                        )}
                    >
                        <ReorderIcon />
                        <GVItem item={value} />
                    </div>
                );
            }}
        />
    );
};
