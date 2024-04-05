import Head from 'next/head';
import React from 'react';
import { DocumentParameter } from 'components/_common/metatags/DocumentParameterMetatags';
import { SiteInfoHeader } from './header/SiteInfoHeader';
import { SiteInfoProps } from './types';
import { SiteInfoPublishInfo } from './publish-info/SiteInfoPublishInfo';
import { SiteInfoCustomPaths } from './custom-paths/SiteInfoCustomPaths';

import { SiteInfoFeatureToggles } from './feature-toggles/SiteInfoFeatureToggles';
import style from './SiteInfo.module.scss';

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
                <title>{'nav.no cms status'}</title>
                <meta name={DocumentParameter.DecoratorDisabled} content={'true'} />
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
                    <SiteInfoFeatureToggles />
                </div>
            </div>
        </>
    );
};
