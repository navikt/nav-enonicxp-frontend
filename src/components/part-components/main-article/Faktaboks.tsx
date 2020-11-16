import * as React from 'react';
import { InfoIcon } from '../notifications/icons/InfoIcon';
import { ParsedHtml } from '../_dynamic/ParsedHtml';

interface Props {
    label: string,
    fakta: string,
    wrapperClass: string
}

const Faktaboks = (props: Props) => {
    if (!props.fakta) {
        return <></>
    }

    return (
        <div className={props.wrapperClass}>
            <InfoIcon />
            <h3 className="decorated">{props.label}</h3>
            <ParsedHtml content={props.fakta} />
        </div>
    );
}
export default Faktaboks;
