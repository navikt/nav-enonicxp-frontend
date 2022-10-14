import * as React from 'react';
import { ParsedHtml } from '../../../../_common/parsed-html/ParsedHtml';
import { StaticImage } from '../../../../_common/image/StaticImage';
import { ProcessedHtmlProps } from '../../../../../types/processed-html-props';

import style from './Faktaboks.module.scss';

import icon from '/public/gfx/info-sirkel-fyll.svg';

type Props = {
    label: string;
    fakta: ProcessedHtmlProps;
};

export const Faktaboks = (props: Props) => {
    if (!props?.fakta?.processedHtml) {
        return null;
    }

    return (
        <div className={style.facts}>
            <StaticImage imageData={icon} alt={''} className={style.factIcon} />
            <h3 className={style.decorated}>{props.label}</h3>
            <ParsedHtml htmlProps={props.fakta} />
        </div>
    );
};
