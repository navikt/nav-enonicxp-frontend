import React from 'react';
import { ButtonPartProps } from '../../../../types/component-props/parts/button';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { Button } from '../../../_common/button/Button';

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button
            href={linkProps.url}
            type={type}
            icon={icon}
            mini={size === 'mini'}
            kompakt={size === 'kompakt'}
            fullWidth={fullwidth}
        >
            {linkProps.text}
        </Button>
    );
};
