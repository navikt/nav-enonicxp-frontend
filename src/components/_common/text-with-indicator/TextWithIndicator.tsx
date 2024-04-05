import React from 'react';

import { classNames } from 'utils/classnames';

import style from './TextWithIndicator.module.scss';

type Props = {
    text: string;
    prefix?: string;
    isActive: boolean;
};

const TextWithIndicator = (props: Props) => {
    const { text, prefix, isActive } = props;
    return (
        <div className={style.textWithIndicator}>
            <span
                className={classNames(style.indicator, isActive ? style.active : style.inactive)}
            />
            <span>
                {prefix && <span className={style.prefix}>{prefix}&nbsp;</span>}
                <span className={style.text}>{text}</span>
            </span>
        </div>
    );
};

export default TextWithIndicator;
