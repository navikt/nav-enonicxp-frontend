import { LargeCard } from 'components/_common/card/LargeCard';
import React from 'react';
import { CardType } from 'types/card';
import { TilbyderkortPartProps } from '../../../types/component-props/parts/tilbyderkort';
import { getSelectableLinkProps } from '../../../utils/links-from-content';

export const ProviderCardPart = ({ config }: TilbyderkortPartProps) => {
    const { link, description, endnote } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <LargeCard
            link={linkProps}
            type={CardType.Provider}
            description={description}
            category={endnote}
        />
    );
};
