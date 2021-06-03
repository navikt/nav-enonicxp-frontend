import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export type ContactOption = 'chat' | 'write' | 'call';

export interface ContactOptionProps extends PartComponentProps {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: {
            _selected: ContactOption;
        } & {
            chat: { ingress: string };
            write: { ingress: string };
            call: { ingress: string; phoneNumber: string };
        };
    };
}
