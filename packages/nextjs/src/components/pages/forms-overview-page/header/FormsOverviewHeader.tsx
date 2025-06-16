import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import Region from 'components/layouts/Region';
import { Heading } from 'components/_common/headers/Heading';

import style from './FormsOverviewHeader.module.scss';

export const FormsOverviewHeader = (props: FormsOverviewProps) => {
    const { data, page } = props;
    const { title, underTitle } = data;

    return (
        <div className={style.container}>
            <Heading level={'1'} size={'xlarge'} className={style.header}>
                {title}
            </Heading>
            {underTitle && <BodyShort className={style.subHeader}>{underTitle}</BodyShort>}
            <Region pageProps={props} regionProps={page.regions.mainCol} />
        </div>
    );
};
