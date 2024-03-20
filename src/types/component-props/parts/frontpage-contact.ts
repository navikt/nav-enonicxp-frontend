import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ContentType } from 'types/content-props/_content-common';
import { ContactInformationProps } from 'types/content-props/contact-information-props';

type InternalContactUs = {
    type: ContentType.GenericPage;
    _path: string;
};

type ExternalContactUs = {
    type: ContentType.ExternalLink;
    data: {
        url: string;
    };
};

export interface FrontpageContanctPartProps extends PartComponentProps {
    descriptor: PartType.FrontpageContact;
    config: {
        title: string;
        chatTitle: string;
        chatAlertText?: string;
        sharedContactInformation: ContactInformationProps[];
        chatIngress: string;
        contactUsTitle: string;
        contactUsAlertText?: string;
        contactUsIngress: string;
        contactUsLink: InternalContactUs | ExternalContactUs;
    };
}
