import React, { useEffect, useRef, useState } from 'react';
import { Accordion as DSAccordion } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartConfigAccordion } from 'components/parts/accordion/AccordionPart';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';

import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import styles from './Accordion.module.scss';

type AccordionProps = PartConfigAccordion;
type PanelItem = AccordionProps['accordion'][number];

export const Accordion = ({ accordion }: AccordionProps) => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { editorView, type } = contentProps;
    const [openAccordions, setOpenAccordions] = useState<number[]>([]);
    const expandAll = () => {
        setOpenAccordions(accordion.map((_, index) => index));
    };
    const validatePanel = (item: PanelItem) => !!(item.title && item.html);

    useShortcuts({ shortcut: Shortcuts.SEARCH, callback: expandAll });

    const openChangeHandler = (isOpening: boolean, tittel: string, index: number) => {
        handleStickyScrollOffset(isOpening, itemRefs.current[index]);

        if (isOpening) {
            setOpenAccordions([...openAccordions, index]);
        } else {
            setOpenAccordions(openAccordions.filter((i) => i !== index));
        }
        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'trekkspill',
            komponent: 'Accordion',
            målgruppe: context,
            innholdstype: innholdsTypeMap[type],
        });
    };

    useEffect(() => {
        if (window.location.toString().includes('expandall=true')) {
            expandAll();
            return;
        }
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
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        tabIndex={-1}
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
