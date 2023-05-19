import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormsOverviewHeader } from 'components/pages/forms-overview-page/header/FormsOverviewHeader';
import Region from 'components/layouts/Region';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { FormsOverviewList } from 'components/pages/forms-overview-page/forms-list/FormsOverviewList';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

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
        <>
            <AlertBox
                variant={'info'}
                style={{ marginBottom: '3rem', marginTop: '-2.5rem' }}
            >
                <>
                    {
                        'Hei! Denne siden er under utvikling og er ikke helt klar til bruk ennå. Innholdet på siden kan være uferdig. '
                    }
                    <LenkeInline href={'https://www.nav.no/soknader/nb/person'}>
                        {'Gå til dagens skjemaveiviser'}
                    </LenkeInline>
                </>
            </AlertBox>
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
        </>
    );
};
