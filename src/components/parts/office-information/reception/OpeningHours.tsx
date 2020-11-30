import { OpeningHoursProps } from '../../../../types/content-props/office-information-props';

const OpeningHours = (props: {
    openingHours: OpeningHoursProps[];
    closedLabel: string;
    metaKey: string;
}) => {
    return (
        <table>
            <tbody>
                {props.openingHours.map((opening, ix) => {
                    // TODO: check why stengt is a string?
                    const compKey = `${props.metaKey}-${ix}`;

                    return (
                        <tr key={compKey}>
                            {opening.dato && <td>{opening.dato}</td>}
                            <td>{opening.dag}</td>
                            {opening.fra && opening.til && (
                                <td>{`${opening.fra} - ${opening.til}`}</td>
                            )}
                            {opening.stengt === 'true' && (
                                <td>{props.closedLabel}</td>
                            )}
                            {opening.kommentar && <td>{opening.kommentar}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default OpeningHours;
