import React from 'react';
import { MacroQuoteProps } from '../../../types/macro-props/quote';
import { classNames } from '../../../utils/classnames';

export const MacroQuote = ({ config }: MacroQuoteProps) => {
    if (!config?.quote) {
        return null;
    }

    const { quote } = config.quote;

    return (
        <blockquote className={classNames('macro-quote', 'navds-body-long')}>
            {quote}
        </blockquote>
    );
};
