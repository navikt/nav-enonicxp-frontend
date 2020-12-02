import * as React from 'react';

const getUrl = ( content: string ) => {
    // TODO: Lag denne
    return content;
};

export type ButtonProps =  {
    text: string;
    url?: string;
    content?: string;
}
export const ButtonKeys = ['text', 'url', 'content'];

export const Button = ({text, url, content}: ButtonProps) => {
    const href = url ? url : getUrl(content);
    return (
        <a className={'knapp knapp--standard'} href={href}>
            {text}
        </a>
    );
};

export const ButtonBlue = ({text, url, content}: ButtonProps) => {
    const href = url ? url : getUrl(content);
    return (
        <a className={'knapp knapp--hoved'} href={href}>
            {text}
        </a>
    );
};
