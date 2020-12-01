import * as React from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import VideoNavNo from '../../_common/video/VideoNavNo';
import { ParsedHtml } from '../ParsedHtml';
import './Macros.less';
import { BEM } from '../../../../utils/bem';

const getUrl = ( content: string ) => {
    return content;
};
type ButtonProps =  {
    text: string;
    url?: string;
    content?: string;
}
const ButtonKeys = ['text', 'url', 'content'];
const Button = ({text, url, content}: ButtonProps) => {
    const href = url ? url : getUrl(content);
    return (
        <a className={'knapp knapp--standard'} href={href}>
            {text}
        </a>
    );
};
const ButtonBlue = ({text, url, content}: ButtonProps) => {
    const href = url ? url : getUrl(content);
    return (
        <a className={'knapp knapp--hoved'} href={href}>
            {text}
        </a>
    );
};

type FotnoteProps = {
    fotnote: string;
}
const FotnoteKeys = ['fotnote'];
const Fotnote = ({fotnote}: FotnoteProps) => {
    return (
        <sup>
            {fotnote}
        </sup>
    );
};

type infoBoksProps = {
    infoBoks: string;
}
const infoBoksKeys = ['infoBoks'];
const infoBoks = ({infoBoks}: infoBoksProps) => {
    return (
        <AlertStripeInfo>
            <ParsedHtml content={infoBoks} />
        </AlertStripeInfo>
    );
};

type lenkeFilerProps = {
    text: string;
    files: string[];
}
const lenkeFilerKeys = ['text', 'files'];
const lenkeFiler = ({text, files}): lenkeFilerProps => {
    return null;
};

type QuoteProps = {
    quote: string;
}
const QuoteKeys = ['quote'];
const Quote = ({quote}: QuoteProps) => {
    const bem = BEM('macro-quote');
    return (
        <blockquote className={`${bem()}`}>
            <p>{quote}</p>
        </blockquote>
    );
};

const Tankestrek = () => {
    return (<> – </>);
};

type varselBoksProps = {
    varselBoks: string;
}
const varselBoksKeys = ['varselBoks'];
const varselBoks = ({varselBoks}: varselBoksProps) => {
    return (
        <AlertStripeAdvarsel>
            <ParsedHtml content={varselBoks} />
        </AlertStripeAdvarsel>
    );
};

type VideoProps = {
    title: string;
    video: string;
}
const VideoKeys = ['title', 'video'];
const Video = ({title, video}: VideoProps) => {
    return (
        <VideoNavNo src={video} title={title} />
    );
};

const htmlMacros = {
    'button': {
        render: Button,
        keys: ButtonKeys,
    },
    'button-blue': {
        render: ButtonBlue,
        keys: ButtonKeys,
    },
    'fotnote': {
        render: Fotnote,
        keys: FotnoteKeys,
    },
    'infoBoks': {
        render: infoBoks,
        keys: infoBoksKeys,
    },
    'lenkeFiler': {
        render: lenkeFiler,
        keys: lenkeFilerKeys,
    },
    'quote': {
        render: Quote,
        keys: QuoteKeys,
    },
    'tankestrek': {
        render: Tankestrek,
        keys: null,
    },
    'varselBoks': {
        render: varselBoks,
        keys: varselBoksKeys,
    },
    'video': {
        render: Video,
        keys: VideoKeys,
    },
};

// Find correct props from string array ['key=', 'value', ... ]
const getProps = (data, validProps) => {
    const { props } = data.reduce(
        (acc, el) => {
            let { props, key } = acc;
            if (el.lastIndexOf('=') === el.length - 1) {
                const keyToFind = el.slice(0, -1);
                if (validProps.includes(keyToFind)) {
                    // Set key to be found on next iteration
                    props[keyToFind] = null;
                    key = keyToFind;
                }
            } else if ( key !== '' ) {
                // Set value of key
                props[key] = el;
            }
            return { props, key };
        },
        { props: {}, key: '' }
    );
    return props;
};

export const ParseMacro = (data: string) => {
    if (data?.includes('#MACRO')) {
        // Må gjøre om evetuelle anførselstegn for atributt-verdier til '
        const parsedParam = data.replace(/\\"/g, `'`);
        // Første element er makronavnet, resten er "key/value-pairs"
        const macroParam = parsedParam.split('_name="')[1].split('"');
        const macro = macroParam[0];
        // Fjern makronavnet (første element) og metadata fra XP, og trim
        const macroData = macroParam
            .filter( (item, index) => index !== 0 && item !== '' && !item.includes('_') )
            .map(el => el.trim());
        // Kall eventuell macro med tilhørende props
        if (htmlMacros[macro]) {
            return htmlMacros[macro].render(
                getProps(macroData, htmlMacros[macro].keys)
            );
        }
    }
    return null;
};
