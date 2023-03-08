import { ContentCommonProps, ContentType } from './_content-common';

export type FormTypes = 'application' | 'complaint' | 'addendum';

export type FormApplicationTypes = 'digital' | 'paper';
export type FormComplaintTypes = 'complaint' | 'appeal';
export type FormAddendumTypes = 'addendum_digital' | 'addendum_paper';

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
        addendum: {
            variations: Variation<FormAddendumTypes>[];
        };
    };
}

export interface FormDetails extends ContentCommonProps {
    __typename: ContentType.CurrentTopicPage;
    data: FormDetailsData;
}
