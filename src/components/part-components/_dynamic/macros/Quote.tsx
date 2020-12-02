import * as React from 'react';
import { BEM } from '../../../../utils/bem';

export type QuoteProps = {
    quote: string;
}
export const QuoteKeys = ['quote'];

export const Quote = ({quote}: QuoteProps) => {
    const bem = BEM('macro-quote');
    return (
        <blockquote className={`${bem()}`}>
            <p>{quote}</p>
        </blockquote>
    );
};
