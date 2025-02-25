import * as React from 'react';
import { Table } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { PublishingCalendarEntryProps } from 'types/content-props/publishing-calendar-props';
import { PublishingCalendarEntryLegacyPart } from 'components/parts/_legacy/publishing-calendar/PublishingCalendarEntryLegacyPart';

// eslint-disable-next-line css-modules/no-unused-class
import style from './PublishingCalendar.module.scss';

// For preview only - hacks layout from PublishingCalendar
export const PublishingCalendarEntryPage = (props: PublishingCalendarEntryProps) => {
    return (
        <div className={classNames('layout', 'layout__main')}>
            <div className={classNames('region', 'region region__first')}>
                <div className={style.publishingCalendar}>
                    <Table>
                        <Table.Body>
                            <PublishingCalendarEntryLegacyPart {...props} />
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <div className={classNames('region', 'region region__second')} />
        </div>
    );
};
