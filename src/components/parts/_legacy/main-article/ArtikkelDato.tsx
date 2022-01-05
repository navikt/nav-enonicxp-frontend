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
    const { publish, createdTime, modifiedTime, publishLabel, modifiedLabel} = props;
    const publishedDate = publish?.first ?? createdTime;
    const publishedString = `${publishLabel} ${formatDate(
        publishedDate, language, true
    )}`;
    const getStringParts = translator('stringParts', language);
    let modifiedString = '';
    if (new Date(modifiedTime) > new Date(publishedDate)) {
        const lastModified = `${modifiedLabel} ${formatDate(
            modifiedTime, language, true
        )}`;
        modifiedString = ` ${getStringParts('conjunction')} ${lastModified}`;
    }
    return (
        <time dateTime={publishedDate}>
            <BodyLong className={'page-modified-info'}>
                {publishedString + modifiedString}
            </BodyLong>
        </time>
    );
};
export default ArtikkelDato;
