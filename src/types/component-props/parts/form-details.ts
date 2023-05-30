import { PartComponentProps } from '../_component-common';
import { FiltersMixin } from '../_mixins';
import { PartType } from '../parts';
import { FormDetailsPageProps } from 'types/content-props/form-details';

export interface FormDetailsProps extends PartComponentProps {
    descriptor: PartType.FormDetails;
    config: {
        targetFormDetails: FormDetailsPageProps;
        showTitle: boolean;
        showIngress: boolean;
        showAddendums: boolean;
        showComplaints: boolean;
        showApplications: boolean;
    } & FiltersMixin;
}
