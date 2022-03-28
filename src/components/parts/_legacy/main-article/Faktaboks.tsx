import * as React from 'react';
import { ParsedHtml } from '../../../_common/parsed-html/ParsedHtml';
import { StaticImage } from '../../../_common/image/StaticImage';
import { ProcessedHtmlProps } from '../../../../types/processed-html-props';

import icon from '/public/gfx/info-sirkel-fyll.svg';

interface Props {
    label: string;
    fakta: ProcessedHtmlProps;
    className: string;
}

export const Faktaboks = (props: Props) => {
    if (!props?.fakta?.processedHtml) {
        return null;
    }

    return (
        <div className={props.className}>
            <StaticImage imageData={icon} alt={''} className={'fact-icon'} />
            <h3 className="decorated">{props.label}</h3>
            <ParsedHtml htmlProps={props.fakta} />
        </div>
    );
};
