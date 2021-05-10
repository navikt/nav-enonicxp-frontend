import React from 'react';
import '../components/macros/Quote.less';
import '../components/macros/Video.less';
import { parseHtmlByProps } from '../utils/parse-html';

interface Props {
    content?: string;
}

export const ParsedHtml = (props: Props) => {
    const { content } = props;

    if (!content) {
        return null;
    }

    const htmlParsed = parseHtmlByProps(content, {
        macros: true,
        tableAttribs: true,
        tableClass: true,
    });

    return <>{htmlParsed}</>;
};
