import { DynamicImage } from './image';
import { DynamicText } from './text';
import { DynamicRegions } from '../_schema';
import { DynamicLinkPanel } from './link-panel';

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
      }
    | {
          type: 'layout';
          path: string;
          config?: DynamicRegionConfig;
          descriptor: string;
          regions: DynamicRegions;
      }
    | {
          type: 'part';
          path: string;
          config: undefined;
          descriptor: string;
          regions: undefined;
      };

export interface DynamicRegionConfig {
    distribution: string;
    margin: string;
}

export type DynamicGlobalComponent =
    | DynamicImage
    | DynamicText
    | DynamicLinkPanel;
