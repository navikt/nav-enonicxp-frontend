import React, { useRef, useState } from 'react';
import { ReadMore } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { Snarveier, useSnarveier } from 'utils/useSnarveier';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import { useCheckAndOpenPanel } from 'store/hooks/useCheckAndOpenPanel';
import { harRedaktorfeil } from 'components/_editor-only/redaktorvarsler/harRedaktorfeil';
import styles from './ReadMorePart.module.scss';

export type PartConfigReadMore = {
    title: string;
    html: ProcessedHtmlProps;
    isOpen?: boolean;
};

export const ReadMorePart = ({ config }: PartComponentProps<PartType.ReadMore>) => {
    const [isOpen, setIsOpen] = useState(config?.isOpen ?? false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);

    useSnarveier({
        shortcut: Snarveier.SEARCH,
        callback: () => setIsOpen(true),
    });

    useCheckAndOpenPanel(isOpen, setIsOpen, divRef);

    if (!config?.html || !config.title) {
        return <EditorHelp text={'Legg inn tittel og beskrivelse for "les mer".'} type={'error'} />;
    }

    const openChangeHandler = (isOpening: boolean, tittel: string) => {
        handleStickyScrollOffset(isOpening, divRef.current);
        setIsOpen(isOpening);
        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'lesmer',
            komponent: 'ReadMore',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
        });
    };

    const { title, html } = config;

    return (
        <div tabIndex={-1} ref={divRef}>
            <ReadMore
                header={title}
                open={isOpen || harRedaktorfeil(contentProps)}
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
