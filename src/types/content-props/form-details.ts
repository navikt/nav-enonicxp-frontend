import { OptionSetSingle } from 'types/util-types';
import { ContentCommonProps, ContentType } from './_content-common';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { LinkSelectable } from 'types/component-props/_mixins';

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
    type: ContentType.FormDetails;
    data: FormDetailsData;
} & ContentCommonProps;
