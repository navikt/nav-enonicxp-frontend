import React, { useEffect, useState } from 'react';
import { Accordion as DSAccordion } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { usePageContentProps } from 'store/pageContext';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartConfigAccordion } from 'components/parts/accordion/AccordionPart';
import { classNames } from 'utils/classnames';

import defaultHtml from 'components/_common/parsed-html/DefaultHtmlStyling.module.scss';
import styles from './Accordion.module.scss';

type AccordionProps = PartConfigAccordion;
type PanelItem = AccordionProps['accordion'][number];

export const Accordion = ({ accordion }: AccordionProps) => {
    const { editorView } = usePageContentProps();
    const [openAccordions, setOpenAccordions] = useState<number[]>([]);

    const expandAll = () => {
        setOpenAccordions(accordion.map((_, index) => index));
    };

    const validatePanel = (item: PanelItem) => !!(item.title && item.html);

    useShortcuts({ shortcut: Shortcuts.SEARCH, callback: expandAll });

    const openChangeHandler = (isOpen: boolean, title: string, index: number) => {
        if (isOpen) {
            setOpenAccordions([...openAccordions, index]);
        } else {
            setOpenAccordions(openAccordions.filter((i) => i !== index));
        }
        logAmplitudeEvent(isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND, {
            tittel: title,
            opprinnelse: 'trekkspill',
        });
    };

    useEffect(() => {
        const anchorHash = window.location.hash || '';
        const matchingAccordion = accordion.findIndex(
            (item) => validatePanel(item) && item.anchorId === anchorHash.slice(1)
        );
        if (matchingAccordion !== -1) {
            setOpenAccordions([matchingAccordion]);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    // Show all panels in edit mode, but only valid panels in view mode
    const validAccordion = accordion.filter(validatePanel);
    const relevantAccordion = editorView === 'edit' ? accordion : validAccordion;

    return (
        <DSAccordion className={styles.accordion}>
            {relevantAccordion.map((item, index) => {
                const isValid = validatePanel(item);
                return (
                    <DSAccordion.Item
                        key={index}
                        className={styles.item}
                        open={openAccordions.includes(index)}
                        onOpenChange={(open) => openChangeHandler(open, item.title, index)}
                    >
                        <DSAccordion.Header className={styles.header} id={item.anchorId}>
                            {!isValid && (
                                <EditorHelp
                                    text={
                                        'Panelet mangler tittel eller innhold. Klikk for å redigere'
                                    }
                                />
                            )}
                            {isValid && <div className={styles.headerTitle}>{item.title}</div>}
                        </DSAccordion.Header>
                        <DSAccordion.Content className={styles.content}>
                            <div className={classNames(defaultHtml.html, 'parsedHtml')}>
                                <ParsedHtml htmlProps={item.html} />
                            </div>
                        </DSAccordion.Content>
                    </DSAccordion.Item>
                );
            })}
        </DSAccordion>
    );
};
