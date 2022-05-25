import React from 'react';
import { GVItem } from './item/GVItem';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';

// Some classes are only used in the unsorted view
// eslint-disable-next-line css-modules/no-unused-class
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
