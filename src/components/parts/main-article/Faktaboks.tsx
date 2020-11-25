import * as React from 'react';
import { InfoIcon } from '../notifications/icons/InfoIcon';
import { ParsedHtml } from '../../ParsedHtml';

interface Props {
    label: string;
    fakta: string;
    className: string;
}

const Faktaboks = (props: Props) => {
    if (!props.fakta) {
        return null;
    }

    return (
        <div className={props.className}>
            <InfoIcon />
            <h3 className="decorated">{props.label}</h3>
            <ParsedHtml content={props.fakta} />
        </div>
    );
};
export default Faktaboks;
