import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { LinkSelectable } from 'types/component-props/_mixins';
import { KortForInnloggetBruker_Meldekort } from './kort/KortForInnloggetBruker_Meldekort';

type KortForInnloggetBrukerTypeProps = Omit<PartConfigKortForInnloggetBruker['card'], '_selected'>;

type KortForInnloggetBrukerTypes = keyof KortForInnloggetBrukerTypeProps;

const CardComponents: Record<
    KortForInnloggetBrukerTypes,
    React.FunctionComponent<KortForInnloggetBrukerTypeProps[KortForInnloggetBrukerTypes]>
> = {
    meldekort: KortForInnloggetBruker_Meldekort,
};

export type PartConfigKortForInnloggetBruker = {
    card: OptionSetSingle<{
        meldekort: {
            link: LinkSelectable;
        };
    }>;
};

export const KortForInnloggetBrukerPart = ({
    config,
}: PartComponentProps<PartType.KortForInnloggetBruker>) => {
    if (!config?.card?._selected) {
        return <EditorHelp text={'Velg en type for kortet'} />;
    }

    const { _selected } = config.card;

    const cardProps = config.card[_selected];

    const CardComponent = CardComponents[_selected];

    return <CardComponent {...cardProps} />;
};
