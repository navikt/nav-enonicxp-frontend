import React from 'react';
import { LargeCard } from 'components/_common/card/LargeCard';
import { CardType } from 'types/card';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const ProviderCardPart = ({
    config,
}: PartComponentProps<PartType.ProviderCard>) => {
    const { link, description, endnote } = config;

    if (!link) {
        return <EditorHelp text={'Kortet må lenke til et innhold'} />;
    }

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
