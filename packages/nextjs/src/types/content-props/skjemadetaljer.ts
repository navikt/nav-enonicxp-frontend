import { OptionSetSingle } from 'types/util-types';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { LinkSelectable } from 'types/component-props/_mixins';
import { ContentCommonProps, ContentType } from './_content-common';
import { AlertData } from './alerts';

export type FormComplaintTypes = 'complaint' | 'appeal';

export interface Variation<T = string> {
    type?: T;
    link?: LinkSelectable;
    label?: string;
}

export interface FormDetailsData {
    formNumbers?: string[];
    title?: string;
    ingress?: ProcessedHtmlProps;
    languageDisclaimer?: string;
    alerts: AlertData[];
    formType: OptionSetSingle<{
        application: {
            variations: Variation[];
        };
        complaint: {
            variations: Variation<FormComplaintTypes>[];
        };
        addendum: {
            variations: Variation[];
        };
    }>[];
}

export type FormDetailsPageProps = {
    type: ContentType.Skjemadetaljer;
    data: FormDetailsData;
} & ContentCommonProps;
