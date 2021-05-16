import React, { useState } from 'react';
import { GVButton } from '../../messages/button/GVButton';
import { BEM, classNames } from '../../../../../../utils/classnames';
import { GVItemEditor } from '../item-editor/GVItemEditor';
import './GVAddItem.less';

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
