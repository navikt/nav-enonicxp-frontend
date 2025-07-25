import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import style from './KontaktOssKanalIngress.module.scss';

interface Props {
    htmlProps: ProcessedHtmlProps | string;
}
export const KontaktOssKanalIngress = ({ htmlProps }: Props) => {
    return (
        <BodyLong as="div" className={style.text}>
            <ParsedHtml htmlProps={htmlProps} />
        </BodyLong>
    );
};
