import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { OversiktPageProps } from 'types/content-props/oversikt-props';
import Region from 'components/layouts/Region';
import { Heading } from 'components/_common/headers/Heading';

import style from './OversiktHeader.module.scss';

export const OversiktHeader = (props: OversiktPageProps) => {
    const { data, page } = props;
    const { title, underTitle } = data;

    return (
        <div className={style.container}>
            <Heading level={'1'} size={'xlarge'} className={style.header}>
                {title}
            </Heading>
            {underTitle && <BodyShort className={style.subHeader}>{underTitle}</BodyShort>}
            <Region pageProps={props} regionProps={page.regions.pageContent} />
        </div>
    );
};
