import { Accordion as DSAccordion } from '@navikt/ds-react';
import { AccordionPartProps } from 'types/component-props/parts/accordion';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './Accordion.module.scss';

type AccordionProps = AccordionPartProps['config'];
type PanelItem = AccordionProps['accordion'][0];

export const Accordion = ({ accordion }: AccordionProps) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    const openChangeHandler = (isOpen: boolean, title: string) => {
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
                        onOpenChange={(open) =>
                            openChangeHandler(open, item.title)
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
