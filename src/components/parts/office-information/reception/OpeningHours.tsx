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
                    <li
                        key={compKey}
                        itemProp="specialOpeningHoursSpecification"
                        itemScope
                        itemType="http://schema.org/OpeningHoursSpecification"
                    >
                        <time itemProp="validFrom" dateTime={opening.isoDate}>
                            {opening.dato}
                        </time>
                        <time
                            itemProp="validThrough"
                            dateTime={opening.isoDate}
                        >
                            {opening.dato}
                        </time>
                        {!opening.stengt && (
                            <>
                                <time
                                    itemProp="opens"
                                    data-th-datetime={opening.fra}
                                >
                                    {opening.fra}
                                </time>
                                <time
                                    itemProp="closes"
                                    data-th-datetime={opening.til}
                                >
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
    const hasKommentar = props.openingHours.some(
        (opening) => !!opening.kommentar
    );

    return (
        <table className="tabell tabell--stripet">
            <tbody>
                {props.openingHours.map((opening, ix) => {
                    // TODO: check why stengt is a string?
                    const compKey = `${props.metaKey}-${ix}`;

                    return (
                        <tr key={compKey}>
                            {opening.dato && <td>{opening.dato}</td>}
                            {opening.dag && <td>{opening.dag}</td>}
                            {opening.fra && opening.til && (
                                <td className="timeslotColumn">{`${opening.fra} - ${opening.til}`}</td>
                            )}
                            {opening.stengt === 'true' && (
                                <td>{props.closedLabel}</td>
                            )}
                            {hasKommentar && <td>{opening.kommentar}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
