import React from 'react';

import style from './FancyChevron.module.scss';

type Props = {
    color: 'white' | 'blue';
    className?: string;
};

export const FancyChevron = ({ color, className }: Props) => {
    return (
        <div className={style.outer} aria-hidden={true}>
            <div className={style.circle}>
                <div className={style.chevron}>
                    <div className={style.tip} />
                </div>
            </div>
        </div>
    );
};
