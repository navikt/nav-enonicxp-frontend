import React, { Fragment, useEffect, useState } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import { GlobalValueItem } from '../../../../../types/content-props/global-values-props';

const bem = BEM('gv-items');

const norwegianSort = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

const sortByDate = (a: GlobalValueItem, b: GlobalValueItem) =>
    norwegianSort(a.itemName.toLowerCase(), b.itemName.toLowerCase());

type Props = {
    sortBy?: 'default' | 'date';
};

export const GVItems = ({ sortBy = 'default' }: Props) => {
    const { valueItems } = useGvEditorState();
    const [sortedItems, setSortedItems] = useState(valueItems);

    useEffect(() => {
        if (sortBy === 'date') {
            setSortedItems(valueItems.sort(sortByDate));
        }
    }, [sortBy, valueItems]);

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
