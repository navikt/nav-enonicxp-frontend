import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ContentType } from '../../content-props/_content-common';

type InternalContactUs = {
    __typename: ContentType.GenericPage;
    _path: string;
};

type ExternalContactUs = {
    __typename: ContentType.ExternalLink;
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
        chatIngress: string;
        contactUsTitle: string;
        contactUsIngress: string;
        contactUsLink: InternalContactUs | ExternalContactUs;
    };
}
