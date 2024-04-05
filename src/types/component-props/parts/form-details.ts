import { PartComponentProps } from 'types/component-props/_component-common';
import { FiltersMixin } from 'types/component-props/_mixins';
import { PartType } from 'types/component-props/parts';
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
