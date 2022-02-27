import Head from 'next/head';
import React from 'react';
import { DocumentParameter } from '../../_common/metatags/DocumentParameterMetatags';
import { SiteInfoHeader } from './header/SiteInfoHeader';
import { ClusterState, SiteInfoProps, SiteInfoContentProps } from './types';
import { SiteInfoPublishInfoList } from './publish-info/content-list/SiteInfoPublishInfoList';

import style from './SiteInfo.module.scss';
import { SiteInfoPublishInfo } from './publish-info/SiteInfoPublishInfo';
import { SiteInfoCustomPaths } from './custom-paths/SiteInfoCustomPaths';

export const SiteInfo = ({
    serverInfo,
    publishScheduled,
    unpublishScheduledNextWeek,
    unpublishScheduledLater,
    recentlyPublished,
    contentWithCustomPath,
}: SiteInfoProps) => {
    return (
        <>
            <Head>
                <title>{'nav.no status'}</title>
                <meta
                    name={DocumentParameter.DecoratorDisabled}
                    content={'true'}
                />
            </Head>
            <div className={style.container}>
                <SiteInfoHeader
                    clusterState={serverInfo.clusterState}
                    serverName={serverInfo.serverName}
                />
                <div className={style.content}>
                    <SiteInfoPublishInfo
                        publishScheduled={publishScheduled}
                        recentlyPublished={recentlyPublished}
                        unpublishScheduledLater={unpublishScheduledLater}
                        unpublishScheduledNextWeek={unpublishScheduledNextWeek}
                    />
                    <SiteInfoCustomPaths contentList={contentWithCustomPath} />
                </div>
            </div>
        </>
    );
};
