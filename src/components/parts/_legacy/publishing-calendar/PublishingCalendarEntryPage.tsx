import * as React from 'react';
import { classNames } from 'utils/classnames';
import { PublishingCalendarEntryProps } from 'types/content-props/publishing-calendar-props';
import PublishingCalendarEntry from './PublishingCalendarEntry';
import { Table } from '@navikt/ds-react';

import style from './PublishingCalendar.module.scss';

// For preview only - hacks layout from PublishingCalendar
const PublishingCalendarEntryPage = (props: PublishingCalendarEntryProps) => {
    return (
        <div className = {classNames('layout', 'layout__main')}>
            <div className={classNames('region', 'region region__first')}>
                <div className={style.publishingCalendar}>
                    <Table>
                        <Table.Body>
                            <PublishingCalendarEntry {...props} />
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <div className={classNames('region', 'region region__second')}>
            </div>
        </div>
    );
};
export default PublishingCalendarEntryPage;