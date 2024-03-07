import { Accordion as DSAccordion } from '@navikt/ds-react';
import { AccordionPartProps } from 'types/component-props/parts/accordion';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './Accordion.module.scss';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { useState } from 'react';

type AccordionProps = AccordionPartProps['config'];
type PanelItem = AccordionProps['accordion'][0];

export const Accordion = ({ accordion }: AccordionProps) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;
    const [openAccordions, setOpenAccordions] = useState<number[]>([]);

    const expandAll = () => {
        setOpenAccordions(accordion.map((_, index) => index));
    };

    useShortcuts({ shortcut: Shortcuts.SEARCH, callback: expandAll });

    const openChangeHandler = (
        isOpen: boolean,
        title: string,
        index: number
    ) => {
        if (isOpen) {
            setOpenAccordions([...openAccordions, index]);
        } else {
            setOpenAccordions(openAccordions.filter((i) => i !== index));
        }
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: 'trekkspill',
            }
        );
    };

    const validatePanel = (item: PanelItem) => !!(item.title && item.html);

    // Show all panels in edit mode, but only valid panels in view mode
    const validAccordion = accordion.filter(validatePanel);
    const relevantAccordion =
        editorView === 'edit' ? accordion : validAccordion;

    return (
        <DSAccordion className={styles.accordion}>
            {relevantAccordion.map((item, index) => {
                const isValid = validatePanel(item);
                return (
                    <DSAccordion.Item
                        key={index}
                        className={styles.item}
                        open={openAccordions.includes(index)}
                        onOpenChange={(open) =>
                            openChangeHandler(open, item.title, index)
                        }
                    >
                        <DSAccordion.Header className={styles.header}>
                            {!isValid && (
                                <EditorHelp
                                    text={
                                        'Panelet mangler tittel eller innhold. Klikk for å redigere'
                                    }
                                />
                            )}
                            {isValid && (
                                <div className={styles.headerTitle}>
                                    {item.title}
                                </div>
                            )}
                        </DSAccordion.Header>
                        <DSAccordion.Content className={styles.content}>
                            <ParsedHtml htmlProps={item.html} />
                        </DSAccordion.Content>
                    </DSAccordion.Item>
                );
            })}
        </DSAccordion>
    );
};
