import Head from 'next/head';
import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { Header } from '../../_common/headers/Header';
import style from './SiteInfo.module.scss';
import { DocumentParameter } from '../../_common/metatags/DocumentParameterMetatags';
import { SiteInfoHeader } from './header/SiteInfoHeader';

type PublishInfo = ContentProps['publish'] & {
    scheduledFrom?: string;
    scheduledTo?: string;
};

type ContentSummary = {
    id: string;
    path: string;
    displayName: string;
    type: string;
    publish: PublishInfo;
};

export type ClusterState = 'RED' | 'YELLOW' | 'GREEN';

export type EditorSiteInfo = {
    publishScheduled: ContentSummary[];
    unpublishScheduled: ContentSummary[];
    recentlyPublished: ContentSummary[];
    serverInfo: {
        serverName: string;
        clusterState?: ClusterState;
    };
};

export const EditorSiteInfo = ({
    serverInfo,
    publishScheduled,
    unpublishScheduled,
    recentlyPublished,
}: EditorSiteInfo) => {
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
                    headerText={'nav.no status'}
                    clusterState={serverInfo.clusterState}
                    serverName={serverInfo.serverName}
                />
                <div>
                    <Header level={'2'}>
                        {'Nylige publiseringer (siste 24 timer)'}
                    </Header>
                    <ul>
                        {recentlyPublished.map((content) => (
                            <li key={content.id}>
                                <Header level={'3'}>
                                    {content.displayName}
                                </Header>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Header level={'2'}>
                        {'Kommende forhåndspubliseringer'}
                    </Header>
                    <ul>
                        {publishScheduled.map((content) => (
                            <li key={content.id}>
                                <Header level={'3'}>
                                    {content.displayName}
                                </Header>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Header level={'2'}>{'Kommende avpubliseringer'}</Header>
                    <ul>
                        {unpublishScheduled.map((content) => (
                            <li key={content.id}>
                                <Header level={'3'}>
                                    {content.displayName}
                                </Header>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
