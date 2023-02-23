import { Ingress } from '@navikt/ds-react';
import { FormDetailsProps } from 'types/component-props/parts/form-details';
import { ContentCommonProps, ContentType } from './_content-common';

export type ApplicationTypes =
    | 'digital'
    | 'paper'
    | 'addendum_digital'
    | 'addendum_paper';

export type ComplaintTypes = 'complaint' | 'appeal' | 'addendum';

export type FormType = 'form' | 'complaint';

export interface Variation<T = string> {
    type: T;
    url: string;
    label: string;
    ingress?: string;
}

export interface FormDetailsData {
    formNumbers: string[];
    formType: FormType;
    title: string;
    ingress: string;
    applicationVariations: Variation<ApplicationTypes>[];
    complaintVariations: Variation<ComplaintTypes>[];
}

export interface FormDetails extends ContentCommonProps {
    __typename: ContentType.CurrentTopicPage;
    data: FormDetailsData;
}
