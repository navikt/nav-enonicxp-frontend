import * as React from 'react';
import { formatDate } from '../../../../utils/datetime';

interface Props {
    publish?: {
        first?: string;
    };
    createdTime: string;
    modifiedTime: string;
    publishLabel: string;
    modifiedLabel: string;
}

const ArtikkelDato = (props: Props) => {
    const publisertDato = props.publish?.first ?? props.createdTime;

    const publishedString = `${props.publishLabel}: ${formatDate(
        publisertDato
    )}`;

    let modifiedString = '';
    const modifiedDato = props.modifiedTime;
    if (new Date(modifiedDato) > new Date(publisertDato)) {
        const lastModified = `${props.modifiedLabel}: ${formatDate(
            props.modifiedTime
        )}`;
        modifiedString = ` | ${lastModified}`;
    }

    const innhold = publishedString + modifiedString;

    return <time dateTime={props.publish?.first}>{innhold}</time>;
};
export default ArtikkelDato;
