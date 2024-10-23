import React from 'react';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from 'components/_common/button/Button';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

import style from './ButtonPart.module.scss';

export type PartConfigButton = {
    link: LinkSelectable;
    icon?: XpImageProps;
    fullwidth: boolean;
};

export const ButtonPart = ({ config }: PartComponentProps<PartType.Button>) => {
    const { icon, link, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button className={style.button} href={linkProps.url} xpIcon={icon} fullWidth={fullwidth}>
            {linkProps.text}
        </Button>
    );
};
