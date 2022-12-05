import * as React from 'react';
import { Heading, Ingress, Table } from '@navikt/ds-react';
import { translator } from '../../../../translations';
import { PublishingCalendarProps } from '../../../../types/content-props/publishing-calendar-props';
import PublishingCalendarEntry, { sortEntries } from './PublishingCalendarEntry';

import style from './PublishingCalendar.module.scss';

const PublishingCalendar = (props: PublishingCalendarProps) => {
    const getLabel = translator('publishingCalendar', props.language);
    const items = sortEntries(props.children);

    return (
        <div className={style.publishingCalendar}>
            <header>
                <Heading level="1" size="large">
                    {props.displayName}
                </Heading>
                {props.data.ingress && (
                    <Ingress className={style.ingress}>
                        {props.data.ingress}
                    </Ingress>
                )}
            </header>
            <Table zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">{getLabel('publishdate')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{getLabel('event')}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item, index) =>
                        <PublishingCalendarEntry key={index} {...item} />
                    )}
                </Table.Body>
            </Table>
        </div>
    );
};

export default PublishingCalendar;
