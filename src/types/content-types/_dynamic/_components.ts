import { DynamicImage } from './image';
import { DynamicText } from './text';
import { DynamicRegions, PartType } from '../_schema';
import { DynamicLinkPanel } from './link-panel';
import { DynamicSupervisorPanel } from './supervisor-panel';
import { DynamicAlert } from './alert';
import { DynamicReadMorePanel } from './read-more-panel';

export type DynamicRegionComponent =
    | {
          type: 'text';
          path: string;
          descriptor: undefined;
          config: undefined;
          regions: undefined;
          text: string;
      }
    | {
          type: 'image';
          path: string;
          descriptor: undefined;
          config: undefined;
          regions: undefined;
          image: string;
          text: undefined;
      }
    | {
          type: 'layout';
          path: string;
          config?: DynamicRegionConfig;
          descriptor: string;
          regions: DynamicRegions;
          text: undefined;
      }
    | {
          type: 'part';
          path: string;
          config: undefined;
          descriptor: string;
          regions: undefined;
          text: undefined;
      }
    | {
          type: 'page';
          path: string;
          config: undefined;
          descriptor: string;
          regions: undefined;
          text: undefined;
      };

export interface DynamicRegionConfig {
    distribution: string;
    margin: string;
}

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
