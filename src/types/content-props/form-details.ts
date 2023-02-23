import { ContentCommonProps, ContentType } from './_content-common';

type FormTypes = 'application' | 'complaint';

export type FormApplicationTypes =
    | 'digital'
    | 'paper'
    | 'addendum_digital'
    | 'addendum_paper';

export type FormComplaintTypes = 'complaint' | 'appeal' | 'addendum';

export interface Variation<T = string> {
    type: T;
    url: string;
    label: string;
}

export interface FormDetailsData {
    formNumbers: string[];
    title: string;
    ingress: string;
    formType: {
        _selected: FormTypes;
        application: {
            variations: Variation<FormApplicationTypes>[];
        };
        complaint: {
            variations: Variation<FormComplaintTypes>[];
        };
    };
}

export interface FormDetails extends ContentCommonProps {
    __typename: ContentType.CurrentTopicPage;
    data: FormDetailsData;
}
