import { OpeningHoursProps } from '../../../../types/content-props/office-information-props';
import React from 'react';
import { Table } from '../../../_common/table/Table';

export const MetaOpeningHours = (props: {
    openingHours: OpeningHoursProps[];
    metaKey: string;
}) => {
    return (
        <ul className="hidden">
            {props.openingHours.map((opening, ix) => {
                const compKey = `${props.metaKey}-${ix}`;
                return (
                    <li key={compKey}>
                        <time dateTime={opening.isoDate}>{opening.dato}</time>
                        <time dateTime={opening.isoDate}>{opening.dato}</time>
                        {!opening.stengt && (
                            <>
                                <time dateTime={opening.fra}>
                                    {opening.fra}
                                </time>
                                <time dateTime={opening.til}>
                                    {opening.til}
                                </time>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export const OpeningHours = (props: {
    openingHours: OpeningHoursProps[];
    closedLabel: string;
    metaKey: string;
}) => {
    const { openingHours } = props;

    // Handle cases where one openinghour may include both day and date.
    const buildDayInformation = (opening: OpeningHoursProps): string => {
        const { dato, dag } = opening;
        if (dato && dag) {
            return `${dag}, ${dato}`;
        }

        return dato || dag || ''; // Fallback to empty string to avoid showing "undefined"
    };

    // Handle cases where openinghour may include different parts depending on day.
    const buildOpeningInformation = (opening: OpeningHoursProps): string => {
        let tempString = '';
        if (opening.fra && opening.til) {
            tempString = `${opening.fra} - ${opening.til}`;
        }

        if (opening.stengt === 'true') {
            tempString = props.closedLabel;
        }

        return tempString.toLowerCase(); // Styling will take care first uppercase, as this string is result of concatinated strings.
    };

    // Explanation: If a row of openinghour has both hours and a comment, we need to put all comments in each table
    // row into a separate column to keep tings tidy. If there are no cases in openingHours where a
    // openingHour has both opening info AND a comment, we can display all in one single colum (see return logic)
    const hasSomeOpeningInformationAndComments = openingHours.some(
        (opening) => !!(buildOpeningInformation(opening) && opening.kommentar)
    );

    return (
        <Table zebraStripes={false}>
            <tbody>
                {openingHours.map((opening, ix) => {
                    // TODO: check why stengt is a string?
                    const compKey = `${props.metaKey}-${ix}`;

                    const dayInformation = buildDayInformation(opening);
                    const openingInformation = buildOpeningInformation(opening);

                    return (
                        <tr key={compKey}>
                            <td className="dayInformation">{dayInformation}</td>
                            <td className="openingInformation">
                                {openingInformation || ''}
                                {(!openingInformation &&
                                    !hasSomeOpeningInformationAndComments &&
                                    opening.kommentar) ||
                                    ''}
                            </td>
                            <td>
                                {openingInformation ||
                                hasSomeOpeningInformationAndComments
                                    ? opening.kommentar
                                    : ''}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
