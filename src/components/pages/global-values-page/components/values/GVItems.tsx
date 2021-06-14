import React, { Fragment } from 'react';
import { GVItem } from './item/GVItem';
import { BEM } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';

const bem = BEM('gv-items');

export const GVItems = () => {
    const { valueItems } = useGvEditorState();

    return (
        <div className={bem()}>
            {valueItems.map((item) => (
                <Fragment key={item.key}>
                    <hr />
                    <GVItem item={item} />
                </Fragment>
            ))}
        </div>
    );
};
