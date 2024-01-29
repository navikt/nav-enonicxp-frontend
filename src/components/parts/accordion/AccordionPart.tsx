import React from 'react';
import { Accordion } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';

import styles from './AccordionPart.module.scss';

export const AccordionPart = ({ config }: any) => {
    if (!config) {
        return null;
    }

    const { tabs } = config;

    return (
        <div className={styles.accordion}>
            <Accordion>
                {tabs.map((tab, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{tab.header}</Accordion.Header>
                        <Accordion.Content>
                            <ParsedHtml htmlProps={tab.html} />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};
