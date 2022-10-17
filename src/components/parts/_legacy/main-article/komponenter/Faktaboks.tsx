import * as React from 'react';
import { ParsedHtml } from '../../../../_common/parsed-html/ParsedHtml';
import { StaticImage } from '../../../../_common/image/StaticImage';
import { ProcessedHtmlProps } from '../../../../../types/processed-html-props';
import { Heading } from '@navikt/ds-react';

import style from './Faktaboks.module.scss';

import icon from '/public/gfx/info-sirkel-fyll.svg';

type Props = {
    label: string;
    fakta: ProcessedHtmlProps;
    version?: '1' | '2';
};

export const Faktaboks = ({ label, fakta, version = '1' }: Props) => {
    if (!fakta?.processedHtml) {
        return null;
    }

    const baseClassName = version === '1' ? style.facts_v1 : style.facts_v2;
    return (
        <div className={baseClassName}>
            {version === '1' && (
                <StaticImage
                    imageData={icon}
                    alt={''}
                    className={style.factIcon}
                />
            )}
            <Heading level={'3'} size={'xsmall'} className={style.decorated}>
                {label}
            </Heading>
            <ParsedHtml htmlProps={fakta} />
        </div>
    );
};
