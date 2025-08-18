import * as React from 'react';
import { BodyLong, Detail } from '@navikt/ds-react';
import { getPublishedAndModifiedString, getPublishedDateTime } from 'utils/datetime';
import { classNames } from 'utils/classnames';
import { ContentProps } from 'types/content-props/_content-common';
import styles from './ArtikkelDato.module.scss';

type Props = {
    contentProps: ContentProps;
    type?: 'normal' | 'newsPress';
};

const ArtikkelDato = ({ contentProps, type = 'normal' }: Props) => {
    const short = type === 'newsPress';
    const year = type === 'newsPress';

    const dateString = getPublishedAndModifiedString({
        content: contentProps,
        config: { short, year },
    });

    if (type === 'newsPress') {
        return (
            <Detail
                as={'time'}
                dateTime={getPublishedDateTime(contentProps)}
                className={classNames(styles.artikkelDato, styles.small)}
            >
                {dateString}
            </Detail>
        );
    }

    return (
        <BodyLong as={'time'} dateTime={getPublishedDateTime(contentProps)}>
            {dateString}
        </BodyLong>
    );
};

export default ArtikkelDato;
