import React, { useState } from 'react';
import { GVButton } from 'components/pages/global-values-page/components/button/GVButton';
import { classNames } from 'utils/classnames';
import { GVItemEditor } from 'components/pages/global-values-page/components/values/item-editor/GVItemEditor';
import { GlobalValueItem } from 'types/content-props/global-values-props';

import style from './GVAddItem.module.scss';

type Props = {
    type: GlobalValueItem['type'];
};

export const GVAddItem = ({ type }: Props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={classNames(style.gvAddItem, isActive && style.active)}>
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
