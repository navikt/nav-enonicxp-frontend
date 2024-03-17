import React from 'react';
import {
    LoggedinCardProps,
    LoggedInCardTypeProps,
    LoggedInCardTypes,
} from '../../../types/component-props/part-configs/loggedin-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LoggedinCardMeldekort } from './cards/LoggedinCardMeldekort';

const CardComponents: {
    [cardType in LoggedInCardTypes]: React.FunctionComponent<
        LoggedInCardTypeProps[cardType]
    >;
} = {
    meldekort: LoggedinCardMeldekort,
};

export const LoggedinCardPart = ({ config }: LoggedinCardProps) => {
    if (!config?.card?._selected) {
        return <EditorHelp text={'Velg en type for kortet'} />;
    }

    const { _selected } = config.card;

    const cardProps = config.card[_selected];

    const CardComponent = CardComponents[_selected];

    return <CardComponent {...cardProps} />;
};
