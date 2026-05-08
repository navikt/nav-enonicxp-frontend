import React from 'react';
import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import style from './InfokortPart.module.scss';

export type PartConfigInfokort = {
    content: ProcessedHtmlProps;
};

export const InfokortPart = ({ config }: PartComponentProps<PartType.Infokort>) => {
    if (!config) {
        return <EditorHelp text={'Infokortet er ikke konfigurert'} />;
    }

    return (
        <InfoCard className={style.infokort}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <ParsedHtml htmlProps={config.content} />
            </InfoCard.Message>
        </InfoCard>
    );
};
