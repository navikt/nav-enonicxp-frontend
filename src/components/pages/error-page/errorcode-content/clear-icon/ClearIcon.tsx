import React from 'react';
import style from './ClearIcon.module.scss';

export const ClearIcon = () => (
    <div className={style.crossIcon} aria-hidden={true}>
        <div className={style.crossIcon__1} />
        <div className={style.crossIcon__2} />
    </div>
);
