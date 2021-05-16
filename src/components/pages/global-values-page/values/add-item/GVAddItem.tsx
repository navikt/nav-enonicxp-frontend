import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { BEM, classNames } from '../../../../../utils/classnames';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { GlobalValueItem } from '../../../../../types/content-props/global-values-props';
import './GVAddItem.less';

const bem = BEM('gv-add-item');

type Props = {
    allItems: GlobalValueItem[];
    contentId: string;
    refreshValueItems: () => void;
};

export const GVAddItem = ({
    allItems,
    contentId,
    refreshValueItems,
}: Props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className={classNames(bem(), isActive && bem(undefined, 'active'))}
        >
            {isActive ? (
                <>
                    <hr />
                    <GVItemEditor
                        allItems={allItems}
                        contentId={contentId}
                        onFinish={() => {
                            setIsActive(false);
                            refreshValueItems();
                        }}
                    />
                </>
            ) : (
                <GVButton
                    type={'hoved'}
                    onClick={() => setIsActive(true)}
                    className={bem('add-button')}
                >
                    {'Legg til ny verdi'}
                </GVButton>
            )}
        </div>
    );
};
