import { ContentProps } from '../../../types/content-props/_content-common';

export type SiteInfoPublish = ContentProps['publish'] & {
    scheduledFrom?: string;
    scheduledTo?: string;
};

export type SiteInfoContentSummaryProps = {
    id: string;
    path: string;
    customPath?: string;
    displayName: string;
    type: string;
    publish: SiteInfoPublish;
};

export type ClusterState = 'RED' | 'YELLOW' | 'GREEN';
