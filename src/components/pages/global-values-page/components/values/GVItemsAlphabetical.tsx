import React from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import './GVItems.less';

const bem = BEM('gv-items');

const norwegianCompare = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export const GVItemsAlphabetical = () => {
    const { valueItems } = useGvEditorState();

    return (
        <div className={bem()}>
            {valueItems
                .sort((a, b) =>
                    norwegianCompare(
                        a.itemName.toLowerCase(),
                        b.itemName.toLowerCase()
                    )
                )
                .map((item) => (
                    <div className={bem('item')}>
                        <GVItem item={item} />
                    </div>
                ))}
        </div>
    );
};
