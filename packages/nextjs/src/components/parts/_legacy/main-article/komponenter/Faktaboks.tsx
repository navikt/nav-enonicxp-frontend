import React from 'react';
import { Heading } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { StaticImage } from 'components/_common/image/StaticImage';
import { ProcessedHtmlProps } from 'types/processed-html-props';

import style from './Faktaboks.module.scss';

import icon from '/public/gfx/info-sirkel-fyll.svg';

type Props = {
    label: string;
    fakta: ProcessedHtmlProps;
    version?: '1' | '2';
};

export const Faktaboks = ({ label, fakta, version = '1' }: Props) => {
    if (!fakta.processedHtml) {
        return null;
    }

    return (
        <div className={version === '1' ? style.facts_v1 : style.facts_v2}>
            {version === '1' && <StaticImage imageData={icon} className={style.factIcon} />}
            <Heading level="2" size="medium" className={style.decorated}>
                {label}
            </Heading>
            <ParsedHtml htmlProps={fakta} />
        </div>
    );
};
