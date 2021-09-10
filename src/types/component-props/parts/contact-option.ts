import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';

export enum ContactOption {
    CHAT = 'chat',
    WRITE = 'write',
    CALL = 'call',
}

export interface ChannelData {
    ingress?: string;
    phoneNumber?: string;
}

export interface ContactOptionProps extends PartComponentProps {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: {
            _selected: ContactOption;
        } & {
            chat: ChannelData;
            write: ChannelData;
            call: ChannelData;
        };
    } & RenderOnAuthStateMixin;
}
