import { Card } from 'components/_common/card/Card';
import React from 'react';
import { CardSize, CardType } from 'types/card';
import { TilbyderkortPartProps } from '../../../../types/component-props/parts/tilbyderkort';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';

export const ProviderCardPart = ({ config }: TilbyderkortPartProps) => {
    const { link, description, endnote } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Card
            link={linkProps}
            type={CardType.Provider}
            size={CardSize.Large}
            description={description}
            category={endnote}
        />
    );
};
