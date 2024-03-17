export enum DetailType {
    SERVICE_INFORMATION = 'serviceInformation',
    SOCIAL_HELP_LINKS = 'socialHelpLinks',
    SOCIAL_HELP_POSTAL_INFORMATION = 'socialHelpPostalInformation',
    SOCIAL_HELP_PAYOUT_INFORMATION = 'socialHelpPayoutInformation',
}

export type PartConfigOfficeEditorialDetail = {
    detailType?: DetailType;
};
