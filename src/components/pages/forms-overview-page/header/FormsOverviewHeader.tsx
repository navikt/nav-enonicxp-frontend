import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import Region from 'components/layouts/Region';
import { PageHeader } from 'components/_common/headers/page-header/PageHeader';
import { BodyShort } from '@navikt/ds-react';

import style from './FormsOverviewHeader.module.scss';

export const FormsOverviewHeader = (props: FormsOverviewProps) => {
    const { data, page } = props;

    return (
        <div className={style.container}>
            <PageHeader
                size={'xlarge'}
                justify={'left'}
                className={style.header}
            >
                {data.title}
            </PageHeader>
            <BodyShort className={style.subHeader}>{'FRA A TIL Å'}</BodyShort>
            <Region pageProps={props} regionProps={page.regions.mainCol} />
        </div>
    );
};
