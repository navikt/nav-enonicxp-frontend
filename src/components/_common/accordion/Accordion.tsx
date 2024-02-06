import { AccordionPartProps } from 'types/component-props/parts/accordion';
import styles from './Accordion.module.scss';
import { Accordion as DSAccordion } from '@navikt/ds-react';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

type AccordionProps = AccordionPartProps['config'];

export const Accordion = ({ accordion }: AccordionProps) => {
    const openChangeHandler = (isOpen: boolean, title: string) => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: 'trekkspill',
            }
        );
    };

    return (
        <DSAccordion className={styles.accordion}>
            {accordion.map((item, index) => (
                <DSAccordion.Item
                    key={index}
                    className={styles.item}
                    onOpenChange={(open) => openChangeHandler(open, item.title)}
                >
                    <DSAccordion.Header className={styles.header}>
                        <div className={styles.headerTitle}>{item.title}</div>
                    </DSAccordion.Header>
                    <DSAccordion.Content className={styles.content}>
                        <ParsedHtml htmlProps={item.html} />
                    </DSAccordion.Content>
                </DSAccordion.Item>
            ))}
        </DSAccordion>
    );
};
