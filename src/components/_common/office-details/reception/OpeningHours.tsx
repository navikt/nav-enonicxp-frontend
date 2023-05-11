import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { formatDate } from 'utils/datetime';
import { OpeningHours as OpeningHoursProps } from '../../../../types/content-props/office-details-props';
import { Table } from '../../../_common/table/Table';

import styles from './OpeningHours.module.scss';

type Props = {
    openingHours: OpeningHoursProps[];
};

export const OpeningHours = ({ openingHours }: Props) => {
    const { language } = usePageConfig();
    const getOfficeTranslations = translator('office', language);
    const getDateTimeTranslations = translator('dateTime', language);

    const closedLabel = getOfficeTranslations('closed');
    const appointmentOnlyLabel = getOfficeTranslations('appointmentOnly');
    const dayLabel = getDateTimeTranslations('day');
    const timeLabel = getDateTimeTranslations('time');

    const weekdayNames = getDateTimeTranslations('weekDayNames');

    const dagArr: string[] = [
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
    ];

    const weekDayTranslation = dagArr.reduce((acc, elem, index) => {
        acc[elem] = weekdayNames[index];
        return acc;
    }, {});

    // If includes dato, show this rather than day (for special opening hours)
    const buildDayLabel = (opening: OpeningHoursProps): string => {
        const { dato, dag } = opening;
        if (dato) {
            return formatDate({
                datetime: dato,
                language,
                short: true,
                year: true,
            });
        }

        return weekDayTranslation[dag] || ''; // Fallback to empty string to avoid showing "undefined"
    };

    const normalizeTimeLabel = (time: string): string => {
        if (!time) {
            return '';
        }
        return time.replace(':', '.');
    };

    const buildOpeningInformation = (opening: OpeningHoursProps): string => {
        if (opening.kunTimeavtale === 'true') {
            return appointmentOnlyLabel;
        }

        if (opening.fra && opening.til) {
            return `${normalizeTimeLabel(opening.fra)}–${normalizeTimeLabel(
                opening.til
            )}`;
        }

        return closedLabel;
    };

    return (
        <Table zebraStripes={false} className={styles.openingHours}>
            <thead className={styles.srOnly}>
                <tr>
                    <th>{dayLabel}</th>
                    <th>{timeLabel}</th>
                </tr>
            </thead>
            <tbody>
                {openingHours.map((opening, index) => {
                    const dayInformation = buildDayLabel(opening);

                    return (
                        <tr key={index}>
                            <th className="dayInformation" role="row">
                                {dayInformation}
                            </th>
                            <td className="openingInformation">
                                {buildOpeningInformation(opening)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
