import React from 'react';
import { Heading } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';

import style from './SpecialInfo.module.scss';

function specialInfoParseLink(infoContent: string) {
    const isTextClean = (str: string) => {
        // checks for curlies in the string.
        return str.split('{').length < 2 && str.split('}').length < 2;
    };

    const isBalanced = (str: string) => {
        return (str.match(/{/g) || []).length === (str.match(/}/g) || []).length;
    };

    const pattern = /\{((.*?):(.*?))\}/g;
    const result = [];

    let match = pattern.exec(infoContent);
    while (match !== null) {
        // Only correctly formatted urls should be turned into a-tags, so
        // check if the match has balanced curlies and that description is 'OK'
        if (isBalanced(match[0]) && isTextClean(match[2])) {
            result.push({
                match: match[0],
                text: match[2],
                url: match[3],
                start: match.index,
                end: pattern.lastIndex,
            });
        }
        match = pattern.exec(infoContent);
    }
    return result;
}

const parseSpecialInfo = (infoContent: string) => {
    let parsedString: string = infoContent;
    if (!parsedString) {
        return '';
    }
    // replace \n with <br />
    parsedString = parsedString.replace(/(?:\r\n|\r|\n)/g, '<br>');
    // replace urls
    const urls = specialInfoParseLink(parsedString);
    urls.forEach((url) => {
        parsedString = parsedString.replace(url.match, `<a href='${url.url}'>${url.text}</a>`);
    });

    return parsedString;
};

interface Props {
    info: string;
}

export const SpecialInformation = (props: Props) => {
    const specialInfo = parseSpecialInfo(props.info);
    return specialInfo ? (
        <div className={style.specialInformation}>
            <Heading level="2" size="small">
                Opplysninger
            </Heading>
            <ParsedHtml htmlProps={specialInfo} />
        </div>
    ) : null;
};
