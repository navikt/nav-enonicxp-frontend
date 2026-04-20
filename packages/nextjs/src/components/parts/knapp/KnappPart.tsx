import React from 'react';
import { XpImageProps } from 'types/media';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Knapp } from 'components/_common/knapp/Knapp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';

import style from './KnappPart.module.scss';

export type PartConfigKnapp = {
    link: LinkSelectable;
    icon?: XpImageProps;
    fullwidth: boolean;
};

export const KnappPart = ({ config }: PartComponentProps<PartType.Knapp>) => {
    const { icon, link, fullwidth } = config;
    const linkProps = getSelectableLinkProps(link);

    return (
        <Knapp className={style.knapp} href={linkProps.url} xpIcon={icon} fullWidth={fullwidth}>
            {linkProps.text}
        </Knapp>
    );
};
