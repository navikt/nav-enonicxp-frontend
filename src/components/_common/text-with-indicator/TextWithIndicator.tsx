import React from 'react';
import { BodyShort } from '@navikt/ds-react';
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
            {prefix && <span className={style.prefix}>{prefix}</span>}
            <div className={style.text}>
                <span
                    className={classNames(
                        style.indicator,
                        isActive ? style.active : style.inactive
                    )}
                >
                    <span className={style.indicatorInner} />
                </span>
                <BodyShort>{text}</BodyShort>
            </div>
        </div>
    );
};

export default TextWithIndicator;
