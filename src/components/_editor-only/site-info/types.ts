import { CustomContentProps } from '../../../types/content-props/_content-common';

export type SiteInfoPublish = CustomContentProps['publish'] & {
    scheduledFrom?: string;
    scheduledTo?: string;
};

export type SiteInfoContentProps = {
    id: string;
    path: string;
    customPath?: string;
    displayName: string;
    type: string;
    publish: SiteInfoPublish;
};

export type ClusterState = 'RED' | 'YELLOW' | 'GREEN';

export type SiteInfoProps = {
    recentlyPublished: SiteInfoContentProps[];
    publishScheduled: SiteInfoContentProps[];
    unpublishScheduledNextWeek: SiteInfoContentProps[];
    unpublishScheduledLater: SiteInfoContentProps[];
    contentWithCustomPath: SiteInfoContentProps[];
    serverInfo: {
        serverName: string;
        clusterState?: ClusterState;
    };
};
