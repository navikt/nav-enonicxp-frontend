import React from 'react';
import { ReadMorePartProps } from 'types/component-props/parts/read-more';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ReadMore } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

export const ReadMorePart = ({ config }: ReadMorePartProps) => {
    if (!config?.html || !config?.title) {
        return (
            <EditorHelp
                text={'Legg inn tittel og beskrivelse for "les mer".'}
                type={'error'}
            />
        );
    }

    const openChangeHandler = (isOpen: boolean, _title: string) => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: _title,
                opprinnelse: 'lesmer',
            }
        );
    };

    const { title, html } = config;

    return (
        <ReadMore
            header={title}
            onOpenChange={(isOpen) => openChangeHandler(isOpen, title)}
        >
            <ParsedHtml htmlProps={html} />
        </ReadMore>
    );
};
