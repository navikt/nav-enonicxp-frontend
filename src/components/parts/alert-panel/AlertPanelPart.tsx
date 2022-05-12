import React from 'react';
import { Alert, Heading, BodyShort, LinkPanel } from '@navikt/ds-react';
import { Information } from '@navikt/ds-icons';
import { AlertPanelPartProps } from '../../../types/component-props/parts/alert-panel';
import style from './AlertPanelPart.module.scss';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

export const AlertPanelPart = ({ config }: AlertPanelPartProps) => {
    if (!config) {
        return null;
    }

    const { link, header, ingress } = config;

    return (
        <LinkPanel
            border={false}
            className={style.alertPanelPart}
            as={(props) => (
                <LenkeBase
                    href={link}
                    analyticsLabel={header}
                    component="alert-panel"
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <Information className={style.informationIcon} />
            <div className={!ingress && style.ifOnlyHeader}>
                <LinkPanel.Title>{header}</LinkPanel.Title>
                {ingress && (
                    <LinkPanel.Description>{ingress}</LinkPanel.Description>
                )}
            </div>
        </LinkPanel>
    );
};
