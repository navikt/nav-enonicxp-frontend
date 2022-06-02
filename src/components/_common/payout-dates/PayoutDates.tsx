import React from 'react';
import { PayoutDatesData } from '../../../types/content-props/payout-dates';
import { Table } from '../table/Table';
import { formatDate } from '../../../utils/datetime';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

type Props = {
    dates: PayoutDatesData;
    className?: string;
};

export const PayoutDates = ({ dates, className }: Props) => {
    const { language } = usePageConfig();

    return (
        <Table className={className}>
            <thead>
                <tr>
                    <th>{'Dato'}</th>
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
