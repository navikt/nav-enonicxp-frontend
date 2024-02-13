import { ContentCommonProps, ContentType } from './_content-common';
import { OptionSetSingle } from 'types/util-types';

export interface AlertData {
    type: 'information' | 'critical';
    text: string;
    target: {
        _selected: string;
        formDetails: OptionSetSingle<{
            targetContent: string;
        }>;
    };
}

export type AlertInContextPageProps = ContentCommonProps & {
    type: ContentType.AlertInContext;
    data: AlertData;
} & Omit<ContentCommonProps, 'alerts'>; // Avoid circular reference
