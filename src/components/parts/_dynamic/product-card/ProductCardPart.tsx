import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import { Undertekst } from 'nav-frontend-typografi';

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

    const ingressActual = ingressOverride || ingress;

    return (
        <LenkepanelNavNo href={_path} tittel={title} style={{ width: '100%' }}>
            {ingressActual && <div>{ingressActual}</div>}
            {label && <Undertekst>{`Label: ${label}`}</Undertekst>}
        </LenkepanelNavNo>
    );
};
