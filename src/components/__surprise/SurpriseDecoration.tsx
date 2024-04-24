import React from 'react';
import { IllustrationAnimated } from 'components/_common/illustration/animated/IllustrationAnimated';

import style from './SurpriseDecoration.module.scss';

export const SurpriseDecoration = () => {
    return (
        <div className={style.decoration}>
            <img
                src={'/_/attachment/inline/c68f83b6-eeb7-4d25-b73c-fbe20facff92/flowers.svg'}
                alt={''}
                className={style.flowers}
            />
            <IllustrationAnimated
                dataUrl={'/_/attachment/inline/bf8cc4ea-3add-4505-ae42-eb834968626c/flagg.json'}
                isHovering={false}
                loop={true}
            />
        </div>
    );
};
