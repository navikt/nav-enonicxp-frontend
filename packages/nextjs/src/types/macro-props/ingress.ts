import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroIngressProps extends MacroPropsCommon {
    name: MacroType.Ingress;
    config: {
        ingress: {
            body?: string;
        };
    };
}
