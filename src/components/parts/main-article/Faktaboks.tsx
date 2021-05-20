import * as React from 'react';
import { ParsedHtml } from '../../ParsedHtml';
import { PublicImage } from '../../_common/image/PublicImage';
import { ProcessedHtmlProps } from '../../../types/processed-html-props';

interface Props {
    label: string;
    fakta: ProcessedHtmlProps;
    className: string;
}

const Faktaboks = (props: Props) => {
    if (!props.fakta?.processedHtml) {
        return null;
    }

    return (
        <div className={props.className}>
            <PublicImage imagePath={'/gfx/info-sirkel-fyll.svg'} alt={''} />
            <h3 className="decorated">{props.label}</h3>
            <ParsedHtml {...props.fakta} />
        </div>
    );
};
export default Faktaboks;
