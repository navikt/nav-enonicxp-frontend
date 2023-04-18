import { OptionSetSingle } from 'types/util-types';
import { ContentType } from './_content-common';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type FormTypes = 'application' | 'complaint' | 'addendum';

export type FormApplicationTypes = 'digital' | 'paper';
export type FormComplaintTypes = 'complaint' | 'appeal';
export type FormAddendumTypes = 'addendum_digital' | 'addendum_paper';

export interface Variation<T = string> {
    type: T;
    url?: string;
    label?: string;
}

export interface FormDetailsData {
    formNumbers: string[];
    title: string;
    ingress: ProcessedHtmlProps;
    formType: OptionSetSingle<{
        application: {
            variations: Variation<FormApplicationTypes>[];
        };
        complaint: {
            variations: Variation<FormComplaintTypes>[];
        };
        addendum: {
            variations: Variation<FormAddendumTypes>[];
        };
    }>;
}

export interface FormDetailsPageProps {
    type: ContentType.FormDetails;
    data: FormDetailsData;
}
