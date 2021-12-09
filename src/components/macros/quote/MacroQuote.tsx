import React from 'react';
import { MacroQuoteProps } from '../../../types/macro-props/quote';

export const MacroQuote = ({ config }: MacroQuoteProps) => {
    if (!config?.quote) {
        return null;
    }

    const { quote } = config.quote;

    return <blockquote className={'macro-quote'}>{quote}</blockquote>;
};
