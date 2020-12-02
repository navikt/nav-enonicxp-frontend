import * as React from 'react';
import { Button, ButtonBlue, ButtonKeys } from './buttons';
import { infoBoks, infoBoksKeys, varselBoks, varselBoksKeys } from './bokser';
import { Fotnote, FotnoteKeys } from './Fotnote';
import { Quote, QuoteKeys } from './Quote';
import { Video, VideoKeys } from './Video';
import { Tankestrek } from './Tankestrek';
import { DOMElement } from 'react';
import { DomElement } from 'domhandler';

type lenkeFilerProps = {
    text: string;
    files: string[];
}
const lenkeFilerKeys = ['text', 'files'];
const lenkeFiler = ({text, files}): lenkeFilerProps => {
    // TODO: Lag denne (foreløpig ikke i bruk)
    return null;
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

export const ParseMacro = (data: DomElement[]) => {
    console.log(data);
    /*
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
    */
    return null;
};
