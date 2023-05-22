import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import Region from 'components/layouts/Region';
import { PageHeader } from 'components/_common/headers/page-header/PageHeader';
import { BodyShort } from '@navikt/ds-react';
import { translator } from 'translations';

import style from './FormsOverviewHeader.module.scss';

export const FormsOverviewHeader = (props: FormsOverviewProps) => {
    const { data, page, language } = props;

    const getTranslationString = translator('overview', language);

    return (
        <div className={style.container}>
            <PageHeader
                size={'xlarge'}
                justify={'left'}
                className={style.header}
            >
                {data.title}
            </PageHeader>
            <BodyShort className={style.subHeader}>
                {getTranslationString('any')}
            </BodyShort>
            <Region pageProps={props} regionProps={page.regions.mainCol} />
        </div>
    );
};
