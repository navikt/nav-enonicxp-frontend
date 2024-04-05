import * as React from 'react';
import { Heading, Ingress, Table } from '@navikt/ds-react';
import { translator } from 'translations';
import { PublishingCalendarProps } from 'types/content-props/publishing-calendar-props';
import PublishingCalendarEntry, { sortEntries } from './PublishingCalendarEntry';

// eslint-disable-next-line css-modules/no-unused-class
import style from './PublishingCalendar.module.scss';

const PublishingCalendar = (props: PublishingCalendarProps) => {
    const getLabel = translator('publishingCalendar', props.language);
    const items = sortEntries(props.children);

    return (
        <div className={style.publishingCalendar}>
            <Heading level="1" size="large">
                {props.displayName}
            </Heading>
            {props.data.ingress && (
                <Ingress className={style.ingress}>{props.data.ingress}</Ingress>
            )}
            <Table zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">
                            <span className={style.dateHeader}>{getLabel('publishdate')}</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">{getLabel('event')}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item, index) => (
                        <PublishingCalendarEntry key={index} {...item} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default PublishingCalendar;
