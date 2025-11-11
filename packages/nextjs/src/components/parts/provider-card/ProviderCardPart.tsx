import React from 'react';
import { LargeCard } from 'components/_common/card/LargeCard/LargeCard';
import { CardType } from 'types/card';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

export type PartConfigProviderCard = Partial<{
    link: LinkSelectable;
    icon: XpImageProps;
    description: string;
    endnote: string;
}>;

export const ProviderCardPart = ({ config }: PartComponentProps<PartType.ProviderCard>) => {
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
            tagline={endnote}
        />
    );
};
