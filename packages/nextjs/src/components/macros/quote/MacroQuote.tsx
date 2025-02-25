import React from 'react';
import { MacroQuoteProps } from 'types/macro-props/quote';
import { classNames } from 'utils/classnames';
import style from './MacroQuote.module.scss';

export const MacroQuote = ({ config }: MacroQuoteProps) => {
    if (!config?.quote) {
        return null;
    }
    const { quote } = config.quote;
    return (
        <blockquote className={classNames(style.macroQuote, 'navds-body-long')}>{quote}</blockquote>
    );
};
