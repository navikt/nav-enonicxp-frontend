import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import { FormsOverviewProps } from 'types/content-props/forms-overview';
import Region from 'components/layouts/Region';
import { PageHeader } from 'components/_common/headers/page-header/PageHeader';

import style from './FormsOverviewHeader.module.scss';

export const FormsOverviewHeader = (props: FormsOverviewProps) => {
    const { data, page } = props;
    const { title, underTitle } = data;

    return (
        <div className={style.container}>
            <PageHeader size={'xlarge'} justify={'left'} className={style.header}>
                {title}
            </PageHeader>
            <BodyShort className={style.subHeader}>{underTitle}</BodyShort>
            <Region pageProps={props} regionProps={page.regions.mainCol} />
        </div>
    );
};
