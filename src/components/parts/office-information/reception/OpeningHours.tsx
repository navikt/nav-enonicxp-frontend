import { OpeningHoursProps } from '../../../../types/content-props/office-information-props';

const OpeningHours = (props: {
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

export default OpeningHours;
