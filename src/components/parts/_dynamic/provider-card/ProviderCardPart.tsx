import { Card } from 'components/_common/card/Card';
import React from 'react';
import { CardSize, CardType } from 'types/card';
import { TilbyderkortPartProps } from '../../../../types/component-props/parts/tilbyderkort';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';

export const ProviderCardPart = ({ config }: TilbyderkortPartProps) => {
    const { icon, link, description, endnote } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Card
            link={linkProps}
            type={CardType.ServiceProvider}
            size={CardSize.Large}
            icon={icon}
            description={description}
            category={endnote}
        />
    );
};
