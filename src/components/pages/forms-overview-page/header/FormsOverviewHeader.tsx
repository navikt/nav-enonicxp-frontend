import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import Region from 'components/layouts/Region';
import { PageHeader } from 'components/_common/headers/page-header/PageHeader';

import style from './FormsOverviewHeader.module.scss';

export const FormsOverviewHeader = (props: FormsOverviewProps) => {
    const { data, page } = props;

    return (
        <div className={style.header}>
            <PageHeader size={'xlarge'} justify={'left'}>
                {data.title}
            </PageHeader>
            <Region pageProps={props} regionProps={page.regions.mainCol} />
        </div>
    );
};
