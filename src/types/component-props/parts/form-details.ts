import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { FormDetailsPageProps } from 'types/content-props/form-details';

export interface FormDetailsProps extends PartComponentProps {
    descriptor: PartType.FormDetails;
    config: {
        targetFormDetails: FormDetailsPageProps;
    };
}
