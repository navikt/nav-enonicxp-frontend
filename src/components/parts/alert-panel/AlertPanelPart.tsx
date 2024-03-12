import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { AlertPanelPartProps } from 'types/component-props/parts/alert-panel';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import style from './AlertPanelPart.module.scss';

export const AlertPanelPart = ({ config }: AlertPanelPartProps) => {
    if (!config) {
        return null;
    }

    const { link, ingress } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={LenkeBase}
            href={linkProps.url}
            analyticsLabel={linkProps.text}
            analyticsComponent="alert-panel"
        >
            <InformationSquareIcon
                className={style.informationIcon}
                aria-hidden={true}
            />
            <div className={ingress ? '' : style.noIngress}>
                <LinkPanel.Title>{linkProps.text}</LinkPanel.Title>
                {ingress && (
                    <LinkPanel.Description>{ingress}</LinkPanel.Description>
                )}
            </div>
        </LinkPanel>
    );
};
