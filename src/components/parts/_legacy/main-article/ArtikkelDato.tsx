import * as React from 'react';
import { formatDate } from '../../../../utils/datetime';
import { BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

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
    const { publish, createdTime, modifiedTime, publishLabel, modifiedLabel } =
        props;
    const publishedDate = publish?.first ?? createdTime;
    const publishedString = `${publishLabel} ${formatDate(
        publishedDate,
        language
    )}`;
    let modifiedString = '';
    if (new Date(modifiedTime) > new Date(publishedDate)) {
        modifiedString = ` ${modifiedLabel} ${formatDate(
            modifiedTime,
            language
        )}`;
    }
    return (
        <BodyLong as={'time'} dateTime={publishedDate}>
            {publishedString}
            {modifiedString && (
                <>
                    <span aria-hidden="true">{' |'}</span>
                    {modifiedString}
                </>
            )}
        </BodyLong>
    );
};
export default ArtikkelDato;
