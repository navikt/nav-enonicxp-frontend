import { ContentCommonProps, ContentType } from './_content-common';
import { LinkSelectable } from 'types/component-props/_mixins';
import { BitmapImage } from 'types/media';

export interface AlertData {
    type: 'information' | 'critical';
    text: string;
    targetContent: string[];
}

export type AlertInContextPageProps = {
    type: ContentType.AlertInContext;
    data: AlertData;
} & Omit<ContentCommonProps, 'alerts'>; // Avoid circular reference
