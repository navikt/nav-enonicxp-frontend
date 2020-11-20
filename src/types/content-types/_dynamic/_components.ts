import { DynamicImage } from './image';
import { DynamicText } from './text';
import { DynamicLinkPanel } from './link-panel';
import { DynamicSupervisorPanel } from './supervisor-panel';
import { DynamicAlert } from './alert';
import { DynamicReadMorePanel } from './read-more-panel';

export type DynamicGlobalComponent = {
    type: 'part';
    path: string;
    descriptor: string;
    regions: undefined;
    part?: {
        descriptor: string;
    };
} & (
    | DynamicImage
    | DynamicText
    | DynamicLinkPanel
    | DynamicSupervisorPanel
    | DynamicAlert
    | DynamicReadMorePanel
);
