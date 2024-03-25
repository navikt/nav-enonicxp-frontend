import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { OpeningHours as OpeningHoursProps } from 'types/content-props/office-details-props';
import { Table } from 'components/_common/table/Table';
import { buildDayLabel } from 'components/pages/office-branch-page/utils';

import style from './OpeningHours.module.scss';

type Props = {
    openingHours: OpeningHoursProps[];
};

export const OpeningHours = ({ openingHours }: Props) => {
    const { language } = usePageContentProps();
    const getOfficeTranslations = translator('office', language);
    const getDateTimeTranslations = translator('dateTime', language);

    const closedLabel = getOfficeTranslations('closed');
    const appointmentOnlyLabel = getOfficeTranslations('appointmentOnly');

    const dayLabel = getDateTimeTranslations('day');
    const timeLabel = getDateTimeTranslations('time');

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
        <Table zebraStripes={false} shadeOnHover={false}>
            <thead className={style.srOnly}>
                <tr>
                    <th role="columnheader">{dayLabel}</th>
                    <th role="columnheader">{timeLabel}</th>
                </tr>
            </thead>
            <tbody>
                {openingHours.map((opening, index) => {
                    const dayInformation = buildDayLabel(opening, language);

                    return (
                        <tr key={index}>
                            <th className="dayInformation">{dayInformation}</th>
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
