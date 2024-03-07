import { OptionSetSingle } from 'types/util-types';

export interface AlertData {
    data: {
        type: 'information' | 'critical';
        text: string;
        target: {
            _selected: string;
            formDetails: OptionSetSingle<{
                targetContent: string;
            }>;
        };
    };
}
