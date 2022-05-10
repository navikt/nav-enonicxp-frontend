import React, { useState } from 'react';
import { GVButton } from '../../button/GVButton';
import { classNames } from '../../../../../../utils/classnames';
import { GVItemEditor } from '../item-editor/GVItemEditor';

import style from './GVAddItem.module.scss';

export const GVAddItem = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className={classNames(style.GVAddItem, isActive && style.active)}
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
