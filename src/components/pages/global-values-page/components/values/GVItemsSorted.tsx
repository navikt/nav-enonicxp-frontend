import React from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import './GVItems.less';

const bem = BEM('gv-items');

const norwegianCompare = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export const GVItemsSorted = () => {
    const { valueItems } = useGvEditorState();
    const sortedItems = [...valueItems].sort((a, b) =>
        norwegianCompare(a.itemName.toLowerCase(), b.itemName.toLowerCase())
    );

    return (
        <div className={bem()}>
            {sortedItems.map((item) => (
                <div className={bem('item-outer')}>
                    <div className={bem('item')} key={item.key}>
                        <GVItem item={item} />
                    </div>
                </div>
            ))}
        </div>
    );
};
