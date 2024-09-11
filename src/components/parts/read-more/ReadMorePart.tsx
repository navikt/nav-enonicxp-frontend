import React, { useRef, useState } from 'react';
import { ReadMore } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { handleStickyScrollOffset } from 'components/_common/accordion/Accordion';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { classNames } from 'utils/classnames';

import defaultHtml from 'components/_common/parsed-html/DefaultHtmlStyling.module.scss';
import styles from './ReadMorePart.module.scss';

export type PartConfigReadMore = {
    title: string;
    html: ProcessedHtmlProps;
};

export const ReadMorePart = ({ config }: PartComponentProps<PartType.ReadMore>) => {
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useShortcuts({
        shortcut: Shortcuts.SEARCH,
        callback: () => setIsOpen(true),
    });

    if (!config?.html || !config.title) {
        return <EditorHelp text={'Legg inn tittel og beskrivelse for "les mer".'} type={'error'} />;
    }

    const openChangeHandler = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        handleStickyScrollOffset(isOpening, divRef.current);

        logAmplitudeEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'lesmer',
            komponent: 'ReadMore',
        });
    };

    const { title, html } = config;

    return (
        <div ref={divRef}>
            <ReadMore
                header={title}
                open={isOpen}
                onOpenChange={(isOpen) => openChangeHandler(isOpen, title)}
                className={styles.readMore}
            >
                <div className={classNames(defaultHtml.html, 'parsedHtml')}>
                    <ParsedHtml htmlProps={html} />
                </div>
            </ReadMore>
        </div>
    );
};
