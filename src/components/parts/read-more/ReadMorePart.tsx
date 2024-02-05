import React from 'react';
import { ReadMorePartProps } from 'types/component-props/parts/read-more';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ReadMore } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';

export const ReadMorePart = ({ config }: ReadMorePartProps) => {
    if (!config?.html || !config?.title) {
        return (
            <EditorHelp
                text={'Legg inn tittel og beskrivelse for "les mer".'}
                type={'error'}
            />
        );
    }

    const { title, html } = config;

    return (
        <ReadMore header={title}>
            <ParsedHtml htmlProps={html} />
        </ReadMore>
    );
};
