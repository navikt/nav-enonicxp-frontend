import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormsOverviewHeader } from 'components/pages/forms-overview-page/header/FormsOverviewHeader';
import Region from 'components/layouts/Region';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { FormsOverviewFilters } from 'components/pages/forms-overview-page/filters/FormsOverviewFilters';
import { FormsOverviewFormDetailsList } from 'components/pages/forms-overview-page/form-details-list/FormsOverviewFormDetailsList';

import style from './FormsOverviewPage.module.scss';

export const FormsOverviewPage = (props: FormsOverviewProps) => {
    const { page, data } = props;

    if (!page) {
        return <EditorHelp text={'Ingen page-komponent er valgt'} />;
    }

    if (page.descriptor !== 'no.nav.navno:two-cols-page') {
        return (
            <EditorHelp
                text={`Ugyldig page-komponent for skjemaoversikt: ${page.descriptor}`}
            />
        );
    }

    const { config, regions } = page;

    return (
        <div className={style.page}>
            <div className={style.leftCol}>
                <IllustrationStatic
                    illustration={data.illustration}
                    className={style.illustration}
                />
                <FormsOverviewHeader {...props} />
                <FormsOverviewFilters />
                <FormsOverviewFormDetailsList />
            </div>
            {config.sideColToggle && (
                <Region pageProps={props} regionProps={regions.sideCol} />
            )}
        </div>
    );
};
