import React from 'react';
import { PayoutDatesData } from 'types/content-props/payout-dates';
import { Table } from 'components/_common/table/Table';
import { formatDate } from 'utils/datetime';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';

import style from './PayoutDates.module.scss';

type Props = {
    payoutDatesData: PayoutDatesData;
    className?: string;
};

export const PayoutDates = ({ payoutDatesData, className }: Props) => {
    const { language } = usePageContentProps();

    const translations = translator('payoutDates', language);

    const { dates, year } = payoutDatesData;

    return (
        <Table className={classNames(style.table, className)}>
            <thead>
                <tr>
                    <th>
                        {year
                            ? `${translations('tableHeaderPrefix')} ${year}`
                            : translations('tableHeaderPrefixNoYear')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(dates).map(([month, day]) => (
                    <tr key={month}>
                        <td>
                            {formatDate({
                                datetime: `${month} ${day} ${year || ''}`,
                                language,
                                short: true,
                            })}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
