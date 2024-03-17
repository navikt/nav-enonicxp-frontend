import React from 'react';
import {
    LoggedInCardTypeProps,
    LoggedInCardTypes,
} from '../../../types/component-props/part-configs/loggedin-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LoggedinCardMeldekort } from './cards/LoggedinCardMeldekort';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

const CardComponents: {
    [cardType in LoggedInCardTypes]: React.FunctionComponent<
        LoggedInCardTypeProps[cardType]
    >;
} = {
    meldekort: LoggedinCardMeldekort,
};

export const LoggedinCardPart = ({
    config,
}: PartComponentProps<PartType.LoggedinCard>) => {
    if (!config?.card?._selected) {
        return <EditorHelp text={'Velg en type for kortet'} />;
    }

    const { _selected } = config.card;

    const cardProps = config.card[_selected];

    const CardComponent = CardComponents[_selected];

    return <CardComponent {...cardProps} />;
};
