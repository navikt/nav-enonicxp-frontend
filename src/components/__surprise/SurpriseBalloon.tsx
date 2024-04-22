import React from 'react';
import { IllustrationAnimated } from 'components/_common/illustration/animated/IllustrationAnimated';

import style from './SurpriseBalloon.module.scss';

export const SurpriseBalloon = () => {
    return (
        <div className={style.balloon}>
            <IllustrationAnimated
                dataUrl={'/_/attachment/inline/220af493-4a10-4eef-bbe6-281350e97f15/balloon.json'}
                isHovering={false}
                loop={true}
            />
        </div>
    );
};
