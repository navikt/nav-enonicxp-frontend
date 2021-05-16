import React, { Fragment } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../store/useGvEditorState';

const bem = BEM('gv-items');

const norwegianSort = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export const GVItems = () => {
    const { valueItems } = useGvEditorState();
    const sortedItems = valueItems
        ?.slice()
        .sort((itemA, itemB) =>
            norwegianSort(
                itemA.itemName.toLowerCase(),
                itemB.itemName.toLowerCase()
            )
        );

    return (
        <div className={bem()}>
            {sortedItems.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <hr />
                        <GVItem item={item} />
                    </Fragment>
                );
            })}
        </div>
    );
};
