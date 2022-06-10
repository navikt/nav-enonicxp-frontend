import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { Information } from '@navikt/ds-icons';
import { AreaCardPartProps } from '../../../types/component-props/parts/area-card';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import style from './AreaCardPart.module.scss';

export const AreaCardPart = ({ config }: AreaCardPartProps) => {
    if (!config) {
        return null;
    }

    const { link } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <LenkeBase
                    href={linkProps.url}
                    analyticsLabel={linkProps.text}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <LinkPanel.Title>{linkProps.text}</LinkPanel.Title>
        </LinkPanel>
    );
};
