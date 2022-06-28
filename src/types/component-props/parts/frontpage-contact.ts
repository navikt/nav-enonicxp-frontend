import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface FrontpageContanctPartProps extends PartComponentProps {
    descriptor: PartType.FrontpageContact;
    config: {
        title: string;
        chatTitle: string;
        chatIngress: string;
        contactUsTitle: string;
        contactUsIngress: string;
        contactUsLink: {
            _path: string;
        };
    };
}
