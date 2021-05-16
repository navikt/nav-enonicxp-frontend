import React, { Fragment } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../utils/classnames';
import { GlobalValueItem } from '../../../../types/content-props/global-values-props';

const bem = BEM('gv-items');

const norwegianSort = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

type Props = {
    items: GlobalValueItem[];
    contentId: string;
};

export const GVItems = ({ items, contentId }: Props) => {
    return (
        <div className={bem()}>
            {items
                .sort((itemA, itemB) =>
                    norwegianSort(
                        itemA.itemName.toLowerCase(),
                        itemB.itemName.toLowerCase()
                    )
                )
                .map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <hr />
                            <GVItem
                                item={item}
                                allItems={items}
                                contentId={contentId}
                            />
                        </Fragment>
                    );
                })}
        </div>
    );
};
