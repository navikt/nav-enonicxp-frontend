import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface DynamicAlert extends PartComponentProps {
    descriptor: PartType.Alert;
    config: {
        type: 'info' | 'suksess' | 'advarsel' | 'feil';
        inline: string;
        content: string;
        margin: string;
    };
}
