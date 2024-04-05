import React, { useState } from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ReadMore } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

import styles from './ReadMorePart.module.scss';

export type PartConfigReadMore = {
    title: string;
    html: ProcessedHtmlProps;
};

export const ReadMorePart = ({ config }: PartComponentProps<PartType.ReadMore>) => {
    const [isOpen, setIsOpen] = useState(false);
    useShortcuts({
        shortcut: Shortcuts.SEARCH,
        callback: () => setIsOpen(true),
    });

    if (!config?.html || !config.title) {
        return <EditorHelp text={'Legg inn tittel og beskrivelse for "les mer".'} type={'error'} />;
    }

    const openChangeHandler = (isOpen: boolean, _title: string) => {
        setIsOpen(isOpen);
        logAmplitudeEvent(isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND, {
            tittel: _title,
            opprinnelse: 'lesmer',
        });
    };

    const { title, html } = config;

    return (
        <ReadMore
            header={title}
            open={isOpen}
            onOpenChange={(isOpen) => openChangeHandler(isOpen, title)}
            className={styles.readMore}
        >
            <ParsedHtml htmlProps={html} />
        </ReadMore>
    );
};
