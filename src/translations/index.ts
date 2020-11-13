import {bundle as se} from './se';
import {bundle as en} from './en';
import {bundle as pl} from './pl';
import {bundle as defaultPack} from './default';

const supportedLanguages = {
    'en' : en,
    'se' : se,
    'pl': pl,
    'no': defaultPack,
}

const labelMaker = (bundle: object) => (key: string) => {
    return bundle[key] || '';
}

export const translator = (module: string, language: string) => {
    let pack = {};
    if (module in defaultPack){
        pack = module in supportedLanguages[language] ? {...defaultPack[module], ...supportedLanguages[language][module]} : defaultPack ;
    }
    return labelMaker(pack);
}
