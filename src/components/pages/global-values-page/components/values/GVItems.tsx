import React, { Fragment, useEffect, useState } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';

const bem = BEM('gv-items');

const norwegianCompare = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export type GlobalValueSortOrder = 'default' | 'alphabetical' | 'custom';

type Props = {
    sortOrder?: GlobalValueSortOrder;
};

export const GVItems = ({ sortOrder = 'default' }: Props) => {
    const { valueItems } = useGvEditorState();
    const [sortedItems, setSortedItems] = useState(valueItems);

    // TODO: add custom ordering
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
        <div className={bem()}>
            {sortedItems.map((item) => (
                <Fragment key={item.key}>
                    <hr />
                    <GVItem item={item} />
                </Fragment>
            ))}
        </div>
    );
};
