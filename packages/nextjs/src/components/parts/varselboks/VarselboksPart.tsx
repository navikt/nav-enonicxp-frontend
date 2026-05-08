import React from 'react';
import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import style from './VarselboksPart.module.scss';

export type PartConfigVarselboks = {
    content: ProcessedHtmlProps;
};

export const VarselboksPart = ({ config }: PartComponentProps<PartType.Varselboks>) => {
    if (!config) {
        return <EditorHelp text={'Varselboksen er ikke konfigurert'} />;
    }

    return (
        <InfoCard className={style.varselboks}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <ParsedHtml htmlProps={config.content} />
            </InfoCard.Message>
        </InfoCard>
    );
};
