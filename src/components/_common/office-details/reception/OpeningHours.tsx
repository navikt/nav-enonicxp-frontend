import React from 'react';
import { formatDate } from 'utils/datetime';
import { OpeningHours as OpeningHoursProps } from '../../../../types/content-props/office-details-props';
import { Table } from '../../../_common/table/Table';

type Props = {
    openingHours: OpeningHoursProps[];
    closedLabel: string;
    appointmentOnlyLabel: string;
    language: string;
};

export const OpeningHours = ({
    openingHours,
    closedLabel,
    appointmentOnlyLabel,
    language,
}: Props) => {
    // If includes dato, show this rather than day (for special opening hours)
    const buildDayLabel = (opening: OpeningHoursProps): string => {
        const { dato, dag } = opening;
        if (dato) {
            return formatDate(dato, language, true, true);
        }

        return dato || dag || ''; // Fallback to empty string to avoid showing "undefined"
    };

    const buildOpeningInformation = (opening: OpeningHoursProps): string => {
        if (opening.kunTimeavtale === 'true') {
            return appointmentOnlyLabel;
        }

        if (opening.fra && opening.til) {
            return `${opening.fra} - ${opening.til}`;
        }

        return closedLabel;
    };

    return (
        <Table zebraStripes={false}>
            <tbody>
                {openingHours.map((opening, index) => {
                    const dayInformation = buildDayLabel(opening);

                    return (
                        <tr key={index}>
                            <td className="dayInformation">{dayInformation}</td>
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
