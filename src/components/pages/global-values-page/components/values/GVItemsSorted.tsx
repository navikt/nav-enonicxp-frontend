import React from 'react';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { GVItem } from './item/GVItem';

import style from './GVItems.module.scss';

const norwegianCompare = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export const GVItemsSorted = () => {
    const { valueItems } = useGvEditorState();
    const sortedItems = [...valueItems].sort((a, b) =>
        norwegianCompare(a.itemName.toLowerCase(), b.itemName.toLowerCase())
    );

    return (
        <div className={style.gvItems}>
            {sortedItems.map((item) => (
                <div className={style.itemOuter} key={item.key}>
                    <div className={style.item}>
                        <GVItem item={item} />
                    </div>
                </div>
            ))}
        </div>
    );
};
