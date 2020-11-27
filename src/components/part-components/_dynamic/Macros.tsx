import * as React from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import VideoNavNo from '../_common/video/VideoNavNo';

const macroTag = '#MACRO';

const Button = (data: string[]) => {
    return (
        <Knapp>
            {data[3]}
        </Knapp>
    );
};
const ButtonBlue = (data: string[]) => {
    return (
        <Hovedknapp>
            {data[3]}
        </Hovedknapp>
    );
};
const Fotnote = (data: string[]) => {
    return (
        <sup>
            {data[1]}
        </sup>
    );
};
const infoBoks = (data: string[]) => {
    return (
        <AlertStripeInfo>
            {data[1]}
        </AlertStripeInfo>
    );
};
const lenkeFiler = (data: string[]) => {
    return null;
};
const Quote = (data: string[]) => {
    return (
        <blockquote>
            <p>{data[1]}</p>
        </blockquote>
    );
};
const Tankestrek = () => {
    return (<> – </>);
};
const varselBoks = (data: string[]) => {
    return (
        <AlertStripeAdvarsel>
            {data[1]}
        </AlertStripeAdvarsel>
    );
};
const Video = (data: string[]) => {
    return (
        <VideoNavNo src={data[1]} title={data[3]} />
    );
};
const htmlMacros = {
    'button': Button,
    'button-blue': ButtonBlue,
    'fotnote': Fotnote,
    'infoBoks': infoBoks,
    'lenkeFiler': lenkeFiler,
    'quote': Quote,
    'tankestrek': Tankestrek,
    'varselBoks': varselBoks,
    'video': Video,
};

export const ParseMacro = (data: string) => {
    if (data?.includes(macroTag)) {
        // Split dataene opp i "key/value" pairs i en tabell
        const macroParam = data.split('_name="')[1].split('"');
        const macro = macroParam[0];
        // Fjern makronavnet (første element) og metadata fra XP
        const macroData = macroParam.filter( (item, index) => index !== 0 && item !== '' && !item.includes('_') );
        console.log(macroParam);
        console.log(macroData);
        // Kall eventuell macro med "key/value" pairs i en tabell
        if (htmlMacros[macro]) {
            return htmlMacros[macro](macroData);
        }
    }
    return null;
};
