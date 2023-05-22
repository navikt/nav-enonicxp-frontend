import React from 'react';
import {
    FormsOverviewAudienceOptions,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormsOverviewHeader } from 'components/pages/forms-overview-page/header/FormsOverviewHeader';
import Region from 'components/layouts/Region';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { FormsOverviewList } from 'components/pages/forms-overview-page/forms-list/FormsOverviewList';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { FormsOverviewAudienceLinks } from 'components/pages/forms-overview-page/audience-links/FormsOverviewAudienceLinks';
import { classNames } from 'utils/classnames';

import style from './FormsOverviewPage.module.scss';

const getLinksIfTransportPage = (audience: FormsOverviewAudienceOptions) => {
    if (audience?._selected !== 'provider') {
        return null;
    }

    const { pageType } = audience.provider;
    if (pageType?._selected !== 'links') {
        return null;
    }

    return pageType.links?.links.map((link) => ({
        url: link.link._path,
        text: link.text || link.link.data.title,
    }));
};

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
    const { audience, illustration } = data;

    const audienceSubCategoryLinks = getLinksIfTransportPage(audience);

    return (
        <>
            <AlertBox variant={'warning'} style={{ marginBottom: '2.5rem' }}>
                <>
                    {
                        'Hei! Denne siden er under utvikling og er ikke helt klar til bruk ennå. Innholdet på siden kan være uferdig. '
                    }
                    <LenkeInline href={'https://www.nav.no/soknader/nb/person'}>
                        {'Gå til dagens skjemaveiviser'}
                    </LenkeInline>
                </>
            </AlertBox>
            <div
                className={classNames(
                    style.page,
                    config.sideColToggle && style.withSideCol
                )}
            >
                <IllustrationStatic
                    illustration={illustration}
                    className={style.pictogram}
                />
                <div className={style.main}>
                    <FormsOverviewHeader {...props} />
                    {audienceSubCategoryLinks ? (
                        <FormsOverviewAudienceLinks
                            links={audienceSubCategoryLinks}
                        />
                    ) : (
                        <FormsOverviewList {...props} />
                    )}
                </div>
                {config.sideColToggle && (
                    <Region
                        pageProps={props}
                        regionProps={regions.sideCol}
                        className={style.aside}
                    />
                )}
            </div>
        </>
    );
};
