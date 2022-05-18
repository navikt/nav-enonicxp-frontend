import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import { GlobalValueItem } from '../../../../../../types/content-props/global-values-props';

const bem = BEM('gv-add-item');

type Props = {
    type: GlobalValueItem['type'];
};

export const GVAddItem = ({ type }: Props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className={classNames(bem(), isActive && bem(undefined, 'active'))}
        >
            {isActive ? (
                <>
                    <hr />
                    <GVItemEditor
                        newType={type}
                        onClose={() => {
                            setIsActive(false);
                        }}
                    />
                </>
            ) : (
                <GVButton variant={'primary'} onClick={() => setIsActive(true)}>
                    {'Legg til ny'}
                </GVButton>
            )}
        </div>
    );
};
