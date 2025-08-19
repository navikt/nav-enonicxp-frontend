import React from 'react';

import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { OversiktHeader } from 'components/pages/oversikt-page/header/OversiktHeader';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { FormsOverviewAudienceLinks } from 'components/pages/forms-overview-page/audience-links/FormsOverviewAudienceLinks';
import { OversiktAudienceOptions, OversiktPageProps } from 'types/content-props/oversikt-props';
import { PictogramsProps } from 'types/content-props/pictograms';
import { OversiktList } from './forms-list/OversiktList';

import style from './OversiktPage.module.scss';

const getLinksIfTransportPage = (audience: OversiktAudienceOptions[]) => {
    const providerAudience = audience.find((a) => a._selected === 'provider');

    if (providerAudience?._selected !== 'provider') {
        return null;
    }

    const { pageType } = providerAudience.provider;
    if (pageType?._selected !== 'links') {
        return null;
    }

    return pageType.links?.links.map((link) => ({
        url: link.link?._path,
        text: link.text || link.link?.data.title,
    }));
};

export const OversiktPage = (props: OversiktPageProps) => {
    const { page, data } = props;

    const { audience, illustration } = data as {
        audience: OversiktAudienceOptions[];
        illustration: PictogramsProps;
    };

    if (!page) {
        return <EditorHelp text={'Ingen page-komponent er valgt'} />;
    }

    if (page.descriptor !== 'no.nav.navno:single-col-page') {
        return (
            <EditorHelp text={`Ugyldig page-komponent for skjemaoversikt: ${page.descriptor}`} />
        );
    }

    if (!audience.some((a) => a._selected)) {
        return <EditorHelp text={'Ingen målgruppe valgt for skjemaoversikt'} />;
    }

    const audienceSubCategoryLinks = getLinksIfTransportPage(audience);

    return (
        <article className={style.page}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <div className={style.content}>
                <OversiktHeader {...props} />
                {audienceSubCategoryLinks ? (
                    <FormsOverviewAudienceLinks links={audienceSubCategoryLinks} />
                ) : (
                    <OversiktList {...props} />
                )}
            </div>
        </article>
    );
};
