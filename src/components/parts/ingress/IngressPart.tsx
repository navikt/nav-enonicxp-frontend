import React from 'react';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

import { IngressProps } from 'types/component-props/parts/ingress';
import style from './IngressPart.module.scss';
import { Ingress } from '@navikt/ds-react';

export const IngressPart = ({ config }: IngressProps) => {
    if (!config?.ingress) {
        return (
            <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />
        );
    }

    return <Ingress className={style.ingressPart}>{config.ingress}</Ingress>;
};
