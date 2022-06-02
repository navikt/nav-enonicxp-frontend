import React from 'react';
import { PayoutDatesData } from '../../../types/content-props/payout-dates';
import { Table } from '../table/Table';
import { formatDate } from '../../../utils/datetime';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { translator } from '../../../translations';

import style from './PayoutDates.module.scss';

type Props = {
    dates: PayoutDatesData;
    className?: string;
};

export const PayoutDates = ({ dates, className }: Props) => {
    const { language } = usePageConfig();

    const dateString = translator('dateTime', language)('date');

    return (
        <Table className={className}>
            <thead>
                <tr>
                    <th className={style.payoutDatesHeader}>{dateString}</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(dates).map(([month, day]) => (
                    <tr key={month}>
                        <td>{formatDate(`${month} ${day}`, language, true)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
