import * as React from 'react';
import { Heading, Ingress } from '@navikt/ds-react';
import { translator } from '../../../../translations';
import { PublishingCalendarProps } from '../../../../types/content-props/publishing-calendar-props';
import PublishingCalendarEntry, { sortEntries } from './PublishingCalendarEntry';
import { Table } from 'components/_common/table/Table';

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
            <Table>
                <thead>
                    <tr>
                        <th scope="col">{getLabel('publishdate')}</th>
                        <th scope="col">{getLabel('event')}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) =>
                        <PublishingCalendarEntry key={index} {...item} />
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PublishingCalendar;
