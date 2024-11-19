import React, { useRef, useState } from 'react';
import { ReadMore } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';

import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import styles from './ReadMorePart.module.scss';

export type PartConfigReadMore = {
    title: string;
    html: ProcessedHtmlProps;
    isOpen?: boolean;
};

export const ReadMorePart = ({ config }: PartComponentProps<PartType.ReadMore>) => {
    const [isOpen, setIsOpen] = useState(config?.isOpen ?? false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useShortcuts({
        shortcut: Shortcuts.SEARCH,
        callback: () => setIsOpen(true),
    });

    if (!config?.html || !config.title) {
        return <EditorHelp text={'Legg inn tittel og beskrivelse for "les mer".'} type={'error'} />;
    }

    const openChangeHandler = (isOpening: boolean, tittel: string) => {
        handleStickyScrollOffset(isOpening, divRef.current);

        setIsOpen(isOpening);
        logAmplitudeEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'lesmer',
            komponent: 'ReadMore',
        });
    };

    const { title, html } = config;

    return (
        <div tabIndex={-1} ref={divRef}>
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
