import { FiltersMixin } from 'types/component-props/_mixins';
import { FormDetailsPageProps } from 'types/content-props/form-details';

export type PartConfigFormDetails = {
    targetFormDetails: FormDetailsPageProps;
    showTitle: boolean;
    showIngress: boolean;
    showAddendums: boolean;
    showComplaints: boolean;
    showApplications: boolean;
} & FiltersMixin;
