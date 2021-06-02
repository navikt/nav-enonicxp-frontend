import { Kort } from 'components/_common/card/Card';
import React from 'react';
import { CardSize, CardType } from 'types/card';
import { TilbyderkortPartProps } from '../../../../types/component-props/parts/tilbyderkort';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';

export const TilbyderkortPart = ({ config }: TilbyderkortPartProps) => {
    const { icon, link, description } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Kort
            link={linkProps}
            type={CardType.ServiceProvider}
            size={CardSize.Large}
            icon={icon}
            description={description}
            category="Foo bar category"
        />
    );
};
