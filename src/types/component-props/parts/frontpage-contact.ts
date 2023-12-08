import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ContentType } from '../../content-props/_content-common';
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
