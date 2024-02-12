import React from 'react';
import { translator } from 'translations';
import { formatDate } from 'utils/datetime';
import { Language, OpeningHours as OpeningHoursProps } from './utils/types';
import { Table } from '@navikt/ds-react';

import styles from './OpeningHours.module.scss';

type Props = {
    openingHours: OpeningHoursProps[];
    language: Language;
};

export const OpeningHours = ({ openingHours, language }: Props) => {
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
        <Table>
            <Table.Header className={styles.srOnly}>
                <Table.Row>
                    <Table.HeaderCell scope="col">{dayLabel}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{timeLabel}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {openingHours.map((opening, index) => {
                    const dayInformation = buildDayLabel(opening);

                    return (
                        <Table.Row shadeOnHover={false} key={index}>
                            <Table.HeaderCell className="dayInformation">
                                {dayInformation}
                            </Table.HeaderCell>
                            <Table.DataCell className="openingInformation">
                                {buildOpeningInformation(opening)}
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};
