import { ContentProps } from 'types/content-props/_content-common';

export type SiteInfoPublish = ContentProps['publish'] & {
    scheduledFrom?: string;
    scheduledTo?: string;
};

export type SiteInfoContentProps<WithCustomPath = false> = {
    id: string;
    path: string;
    displayName: string;
    type: string;
    publish: SiteInfoPublish;
} & (WithCustomPath extends true
    ? {
          customPath: string;
      }
    : {
          customPath?: string;
      });

export type ClusterState = 'RED' | 'YELLOW' | 'GREEN';

export type SiteInfoProps = {
    recentlyPublished: SiteInfoContentProps[];
    publishScheduled: SiteInfoContentProps[];
    unpublishScheduledNextWeek: SiteInfoContentProps[];
    unpublishScheduledLater: SiteInfoContentProps[];
    contentWithCustomPath: SiteInfoContentProps<true>[];
    serverInfo: {
        serverName: string;
        clusterState?: ClusterState;
    };
};
