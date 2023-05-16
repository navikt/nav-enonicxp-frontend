import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormsOverviewHeader } from 'components/pages/forms-overview-page/header/FormsOverviewHeader';
import Region from 'components/layouts/Region';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { FormsOverviewList } from 'components/pages/forms-overview-page/forms-list/FormsOverviewList';

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
            <IllustrationStatic
                illustration={data.illustration}
                className={style.illustration}
            />
            <div className={style.leftCol}>
                <FormsOverviewHeader {...props} />
                <FormsOverviewList {...props} />
            </div>
            {config.sideColToggle && (
                <Region
                    pageProps={props}
                    regionProps={regions.sideCol}
                    className={style.rightCol}
                />
            )}
        </div>
    );
};
