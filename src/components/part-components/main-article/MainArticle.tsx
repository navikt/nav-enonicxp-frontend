import React from 'react';
import { PageData } from 'types/content-types/_schema';
import { GlobalPageSchema } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { MainArticleMock } from './MainArticleMock';
import { ParsedHtml } from '../_dynamic/ParsedHtml';
import './MainArticle.less';


const parseInnholdsfortegnelse = (htmlText: string) => {
    const toc = [];
    let count = 0;
    let ch = 1;
    let ind = htmlText.indexOf('<h3>');
    while (ind !== -1 && count < 100) {
        const h2End = ind + 4;
        const ssEnd = htmlText.indexOf('</h3>', ind);
        const ss = htmlText
            .slice(h2End, ssEnd)
            .replace(/<([^>]+)>/gi, '') // Strip html
            .replace(/&nbsp;/gi, ' '); // Replace &nbsp;
        count++;
        toc.push(ss);
        htmlText = htmlText.replace(
            '<h3>',
            '<h3 id="chapter-' + ch++ + '" tabindex="-1" class="chapter-header">'
        );
        ind = htmlText.indexOf('<h3>');
    }

    return toc;
}

function getDate(content: GlobalPageSchema, language: string ) {
    if (!content) {
        return '';
    }
    const p = (content.publish?.from ? content.publish?.from : content.createdTime);
    // TODO: oversett
    const published = `Publisert: ${new Date(p)}`;
    const publishedString = `${published}`;

    let modifiedString = '';
    const m = (content.modifiedTime);
    if (new Date(m) > new Date(p)) {
        // TODO: oversett
        const lastModified = `Sist endret: ${new Date(content.modifiedTime) }`;
        modifiedString = ` | ${lastModified}`;
    }
    return publishedString + modifiedString;
}

const cleanupHtml = (htmlText: string) => {
    // Fjern tomme headings og br-tagger fra HTML
    let cleanHtml = htmlText;
    cleanHtml = cleanHtml?.replace(/<h\d>\s*<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<br \/>/g, '');

    return cleanHtml;
}

export const MainArticle = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (MainArticleMock as PageData)
            : props.data;

    const innholdsfortegnelse = data.hasTableOfContents && data.hasTableOfContents !== 'none' ?
        parseInnholdsfortegnelse(data.text) : [];


    return (
        <article
            id="pagecontent"
            className="main-article"
        >
            <header className="article-head">
                <time dateTime={props.publish?.from}>
                    {getDate(props, props.language)}
                </time>
                <h1>{props.displayName}</h1>
                <p className="preface">{data.ingress}</p>
                { data.hasTableOfContents && data.hasTableOfContents !== 'none' &&
                    <nav className="table-of-contents" data-selected-id>
                      <h2 className="visuallyhidden">
                          innholdsfortegnelse // TODO: oversett
                      </h2>
                      <ol>
                          {innholdsfortegnelse.map((item, index) => (
                              <li key={index}>
                                  <a data-ga="toc" href={`#chapter-${index + 1}`}>{item}</a>
                              </li>
                          ))}
                      </ol>
                    </nav>
                }
            </header>
            <ParsedHtml content={cleanupHtml(data.text)}/>
        </article>

    );
};
