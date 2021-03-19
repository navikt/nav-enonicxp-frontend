import { OpeningHoursProps } from '../../../../types/content-props/office-information-props';
import React from 'react';

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
                                <time data-th-datetime={opening.fra}>
                                    {opening.fra}
                                </time>
                                <time data-th-datetime={opening.til}>
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

    return (
        <table className="tabell tabell--stripet">
            <tbody>
                {openingHours.map((opening, ix) => {
                    // TODO: check why stengt is a string?
                    const compKey = `${props.metaKey}-${ix}`;

                    const dayInformation = buildDayInformation(opening);
                    const openingInformation = buildOpeningInformation(opening);

                    // Misc NAV-offices will have various use and combination of til, fra and kommentar.
                    // In order to attempt for the best presentation possible, we have to a show and dance
                    // to see if kommentar can be placed inside the openingInformation column if that is empty.
                    return (
                        <tr key={compKey}>
                            <td className="dayInformation">{dayInformation}</td>
                            <td className="openingInformation">
                                {openingInformation || opening.kommentar || ''}
                            </td>
                            <td>
                                {openingInformation ? opening.kommentar : ''}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
