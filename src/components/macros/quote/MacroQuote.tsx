import React from 'react';
import { QuoteMacroProps } from '../../../types/macro-props/quote';
import { Normaltekst } from 'nav-frontend-typografi';
import './MacroQuote.less';

export const MacroQuote = ({ config }: QuoteMacroProps) => {
    if (!config?.quote) {
        return null;
    }

    const { quote } = config.quote;

    return (
        <blockquote className={'macro-quote'}>
            <Normaltekst>{quote}</Normaltekst>
        </blockquote>
    );
};
