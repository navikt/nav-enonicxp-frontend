import * as React from 'react';
import { PublishingCalendarEntryProps } from 'types/content-props/publishing-calendar-props';
import PublishingCalendarEntry from './PublishingCalendarEntry';
import { Table } from 'components/_common/table/Table';

import style from './PublishingCalendar.module.scss';

// For preview only
const PublishingCalendarEntryPage = (props: PublishingCalendarEntryProps) => {
    return (
        <div className={'content'}>
            <div className={style.publishingCalendar}>
                <Table>
                    <tbody>
                        <PublishingCalendarEntry {...props} />
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default PublishingCalendarEntryPage;