import { DynamicImage } from './image';
import { DynamicLinkPanelWithBackground } from './link-panel-with-background';
import { DynamicText } from './text';
import { Regions } from '../content-types/_schema';

export type DynamicRegionComponent =
    | {
          type: 'text';
          path: string;
          descriptor: undefined;
          text: string;
          regions: undefined;
      }
    | {
          type: 'image';
          path: string;
          descriptor: undefined;
          image: string;
          regions: undefined;
      }
    | {
          type: 'layout';
          path: string;
          descriptor: string;
          regions: Regions;
      }
    | {
          type: 'part';
          path: string;
          descriptor: string;
          regions: undefined;
      };

export type DynamicGlobalComponent =
    | DynamicImage
    | DynamicText
    | DynamicLinkPanelWithBackground;
