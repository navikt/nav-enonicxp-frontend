import React, { useEffect, useState } from 'react';
import { List, arrayMove } from 'react-movable';
import { GVItem } from './item/GVItem';
import { BEM, classNames } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import { Up, Down } from '@navikt/ds-icons';
import './GVItems.less';

const bem = BEM('gv-items');

const norwegianCompare = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export type GlobalValueSortOrder = 'default' | 'alphabetical';

const ReorderIcon = () => (
    <span data-movable-handle={true} className={bem('drag-handle')}>
        <Up />
        <Down />
    </span>
);

type Props = {
    sortOrder?: GlobalValueSortOrder;
};

export const GVItems = ({ sortOrder = 'default' }: Props) => {
    const { valueItems } = useGvEditorState();
    const [sortedItems, setSortedItems] = useState(valueItems);

    useEffect(() => {
        if (sortOrder === 'alphabetical') {
            setSortedItems(
                [...valueItems].sort((a, b) =>
                    norwegianCompare(
                        a.itemName.toLowerCase(),
                        b.itemName.toLowerCase()
                    )
                )
            );
        } else {
            setSortedItems(valueItems);
        }
    }, [sortOrder, valueItems]);

    return (
        <List
            values={sortedItems}
            onChange={({ oldIndex, newIndex }) => {
                setSortedItems(arrayMove(sortedItems, oldIndex, newIndex));
            }}
            lockVertically={true}
            renderList={({ children, props }) => (
                <div {...props} className={bem()}>
                    {children}
                </div>
            )}
            renderItem={({ value, props, isDragged }) => {
                return (
                    <div {...props} className={'test'}>
                        <div
                            className={classNames(
                                bem('item'),
                                isDragged && bem('item', 'dragged')
                            )}
                        >
                            <ReorderIcon />
                            <GVItem item={value} />
                        </div>
                    </div>
                );
            }}
        />
    );
};
