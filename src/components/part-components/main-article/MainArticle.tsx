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

const cleanupHtml = (htmlText: string) => {

    // Fjern tomme headings og br-tagger fra HTML
    let cleanHtml = htmlText;
    cleanHtml = cleanHtml.replace(/<h\d>\s*<\/h\d>/g, '');
    cleanHtml = cleanHtml.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    cleanHtml = cleanHtml.replace(/<br \/>/g, '');

    return cleanHtml;
}
export const MainArticle = (props: GlobalPageSchema) => {
    const type = props.__typename;

    const data =
        type === ContentType.TemplatePage
            ? (MainArticleMock as PageData)
            : props.data;

    const innholdsfortegnelse = parseInnholdsfortegnelse(data.text);

    return (
        <div data-portal-region="first" className="col-sm-12 col-md-8">
            <article data-portal-component-type="part" className="full-article factsheet tblc" id="pagecontent">
                <header className="article-head">
                    <time className="pubdate muted" dateTime={props.publish.from}>
                        Todo: parse dato
                    </time>
                    <h1>{props.displayName}</h1>
                    <p className="preface">{data.ingress}</p>
                    { data.hasTableOfContents && data.hasTableOfContents !== 'none' &&
                        <nav className="table-of-contents" data-selected-id="">
                          <h2 className="visuallyhidden" role="heading" aria-level={2}>
                            todo:  Innholdsfortegnelse || table of content  avhenging av språk
                          </h2>
                          <ol>
                              {innholdsfortegnelse.map((item, index) => (
                                  <li key={index}>
                                      <a data-ga="toc" href="#chapter-1">{item}</a>
                                  </li>
                              ))}
                          </ol>
                        </nav>
                    }
                </header>
                <div className="article-body">
                    <ParsedHtml content={cleanupHtml(data.text)}/>
                </div>
            </article>
        </div>

    );
};
