import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVItemEditor } from '../item-editor/GVItemEditor';

const bem = BEM('gv-add-item');

export const GVAddItem = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className={classNames(bem(), isActive && bem(undefined, 'active'))}
        >
            {isActive ? (
                <>
                    <hr />
                    <GVItemEditor
                        onClose={() => {
                            setIsActive(false);
                        }}
                    />
                </>
            ) : (
                <GVButton variant={'primary'} onClick={() => setIsActive(true)}>
                    {'Legg til ny verdi'}
                </GVButton>
            )}
        </div>
    );
};
