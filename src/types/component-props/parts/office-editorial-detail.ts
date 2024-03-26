import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    OfficeBranchPageProps,
    OfficeEditorialPageProps,
} from 'types/content-props/dynamic-page-props';

export enum DetailType {
    SERVICE_INFORMATION = 'serviceInformation',
    SOCIAL_HELP_LINKS = 'socialHelpLinks',
    SOCIAL_HELP_POSTAL_INFORMATION = 'socialHelpPostalInformation',
    SOCIAL_HELP_PAYOUT_INFORMATION = 'socialHelpPayoutInformation',
}

export interface OfficeEditorialDetailProps extends PartComponentProps {
    descriptor: PartType.OfficeEditorialDetail;
    pageProps: OfficeEditorialPageProps | OfficeBranchPageProps;
    config: {
        detailType?: DetailType;
    };
}
