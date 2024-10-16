import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { LinkSelectable } from 'types/component-props/_mixins';
import { LoggedinCardMeldekort } from './cards/LoggedinCardMeldekort';

type LoggedInCardTypeProps = Omit<PartConfigLoggedinCard['card'], '_selected'>;

type LoggedInCardTypes = keyof LoggedInCardTypeProps;

const CardComponents: Record<
    LoggedInCardTypes,
    React.FunctionComponent<LoggedInCardTypeProps[LoggedInCardTypes]>
> = {
    meldekort: LoggedinCardMeldekort,
};

export type PartConfigLoggedinCard = {
    card: OptionSetSingle<{
        meldekort: {
            link: LinkSelectable;
        };
    }>;
};

export const LoggedinCardPart = ({ config }: PartComponentProps<PartType.LoggedinCard>) => {
    if (!config?.card?._selected) {
        return <EditorHelp text={'Velg en type for kortet'} />;
    }

    const { _selected } = config.card;

    const cardProps = config.card[_selected];

    const CardComponent = CardComponents[_selected];

    return <CardComponent {...cardProps} />;
};
