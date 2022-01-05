import * as React from 'react';
import { formatDate } from '../../../../utils/datetime';
import { BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from '../../../../translations';

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
    const { language } = usePageConfig();
    const publisertDato = props.publish?.first ?? props.createdTime;
    const publishedString = `${props.publishLabel}: ${formatDate(
        publisertDato, language, true
    )}`;
    const getStringParts = translator('stringParts', language);
    let modifiedString = '';
    const modifiedDato = props.modifiedTime;
    if (new Date(modifiedDato) > new Date(publisertDato)) {
        const lastModified = `${props.modifiedLabel}: ${formatDate(
            props.modifiedTime, language, true
        )}`;
        modifiedString = ` ${getStringParts('conjunction')} ${lastModified}`;
    }
    return (
        <time dateTime={props.publish?.first}>
            <BodyLong className={'page-modified-info'}>
                {publishedString + modifiedString}
            </BodyLong>
        </time>
    );
};
export default ArtikkelDato;
