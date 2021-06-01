import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';

export const ProductCardPart = ({ config }: ProductCardProps) => {
    if (!config?.targetPage) {
        return (
            <div>
                {
                    'Velg en produktside eller livssituasjon for å aktivere kortet'
                }
            </div>
        );
    }

    const { ingressOverride, targetPage } = config;

    const { _path, data } = targetPage;
    const { title, ingress, label, illustration } = data;

    return (
        <LenkepanelNavNo href={_path} tittel={title}>
            <div>{ingressOverride || ingress}</div>
            <div>{`Label: ${label}`}</div>
        </LenkepanelNavNo>
    );
};
