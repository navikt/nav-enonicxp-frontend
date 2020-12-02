import * as React from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ParsedHtml } from '../ParsedHtml';

export type infoBoksProps = {
    infoBoks: string;
}
export const infoBoksKeys = ['infoBoks'];

export const infoBoks = ({infoBoks}: infoBoksProps) => {
    return (
        <AlertStripeInfo>
            <ParsedHtml content={infoBoks} />
        </AlertStripeInfo>
    );
};

export type varselBoksProps = {
    varselBoks: string;
}
export const varselBoksKeys = ['varselBoks'];

export const varselBoks = ({varselBoks}: varselBoksProps) => {
    return (
        <AlertStripeAdvarsel>
            <ParsedHtml content={varselBoks} />
        </AlertStripeAdvarsel>
    );
};
