import Head from 'next/head';
import React from 'react';
import { DocumentParameter } from '../../_common/metatags/DocumentParameterMetatags';
import { SiteInfoHeader } from './header/SiteInfoHeader';
import { ClusterState, SiteInfoContentSummaryProps } from './types';
import { SiteInfoContentList } from './content-list/SiteInfoContentList';

import style from './SiteInfo.module.scss';

type EditorSiteInfo = {
    recentlyPublished: SiteInfoContentSummaryProps[];
    publishScheduled: SiteInfoContentSummaryProps[];
    unpublishScheduledNextWeek: SiteInfoContentSummaryProps[];
    unpublishScheduledLater: SiteInfoContentSummaryProps[];
    contentWithCustomPath: SiteInfoContentSummaryProps[];
    serverInfo: {
        serverName: string;
        clusterState?: ClusterState;
    };
};

export const EditorSiteInfo = ({
    serverInfo,
    publishScheduled,
    unpublishScheduledNextWeek,
    unpublishScheduledLater,
    recentlyPublished,
    contentWithCustomPath,
}: EditorSiteInfo) => {
    const hasLaterUnpublishSchedule = unpublishScheduledLater.length > 0;

    return (
        <>
            <Head>
                <title>{'nav.no status'}</title>
                <meta
                    name={DocumentParameter.DecoratorDisabled}
                    content={'true'}
                />
            </Head>
            <div className={style.siteInfo}>
                <SiteInfoHeader
                    clusterState={serverInfo.clusterState}
                    serverName={serverInfo.serverName}
                />
                <div className={style.content}>
                    <SiteInfoContentList
                        title={'Publisert siste 24 timer'}
                        titleEmpty={'Ingen publiseringer siste 24 timer'}
                        contentList={recentlyPublished}
                    />
                    <SiteInfoContentList
                        title={'Planlagte forhåndspubliseringer'}
                        titleEmpty={'Ingen planlagte forhåndspubliseringer'}
                        contentList={publishScheduled}
                    />
                    <SiteInfoContentList
                        title={`Planlagte avpubliseringer${
                            hasLaterUnpublishSchedule ? ' neste 7 dager' : ''
                        }`}
                        titleEmpty={`Ingen planlagte avpubliseringer${
                            hasLaterUnpublishSchedule ? ' neste 7 dager' : ''
                        }`}
                        contentList={unpublishScheduledNextWeek}
                    />
                    {hasLaterUnpublishSchedule && (
                        <SiteInfoContentList
                            title={
                                'Planlagte avpubliseringer (mer enn 7 dager frem i tid)'
                            }
                            titleEmpty={'Ingen planlagte avpubliseringer'}
                            contentList={unpublishScheduledLater}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
