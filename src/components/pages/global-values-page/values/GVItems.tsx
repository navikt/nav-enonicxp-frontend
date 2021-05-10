import React, { Fragment } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../utils/classnames';
import { GlobalValueItem } from '../../../../types/content-props/global-values-props';

const bem = BEM('gv-items');

type Props = {
    items: GlobalValueItem[];
    contentId: string;
};

export const GVItems = ({ items, contentId }: Props) => {
    return (
        <div className={bem()}>
            {items.map((item, index) => {
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
