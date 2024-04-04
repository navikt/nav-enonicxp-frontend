import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LoggedinCardMeldekort } from './cards/LoggedinCardMeldekort';
import { PartComponent, PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { LinkSelectable } from 'types/component-props/_mixins';

export type LoggedInCardTypeProps = Omit<PartConfigLoggedinCard['card'], '_selected'>;

export type LoggedInCardTypes = keyof LoggedInCardTypeProps;

const CardComponents: {
    [cardType in LoggedInCardTypes]: React.FunctionComponent<LoggedInCardTypeProps[cardType]>;
} = {
    meldekort: LoggedinCardMeldekort,
};

export type PartConfigLoggedinCard = {
    card: OptionSetSingle<{
        meldekort: {
            link: LinkSelectable;
        };
    }>;
};

export const LoggedinCardPart: PartComponent<PartType.LoggedinCard> = ({ config }) => {
    if (!config?.card?._selected) {
        return <EditorHelp text={'Velg en type for kortet'} />;
    }

    const { _selected } = config.card;

    const cardProps = config.card[_selected];

    const CardComponent = CardComponents[_selected];

    return <CardComponent {...cardProps} />;
};
