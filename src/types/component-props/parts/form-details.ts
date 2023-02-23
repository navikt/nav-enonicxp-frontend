import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { FormDetails } from 'types/content-props/form-details';

export interface FormDetailsProps extends PartComponentProps {
    descriptor: PartType.FormDetails;
    config: {
        showApplicationForms: boolean;
        showComplaintForms: boolean;
        targetFormDetails: FormDetails;
    };
}
