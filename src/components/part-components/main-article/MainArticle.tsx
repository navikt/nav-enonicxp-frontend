import React from 'react';
import { PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { MainArticleMock } from './MainArticleMock';
import { ParsedHtml } from '../_dynamic/ParsedHtml';
import { formatDate } from '../../../utils/datetime';
import { MainArticleProps } from '../../../types/content-types/main-article-props';
import { MainArticleChapterProps } from '../../../types/content-types/main-article-chapter-props';
import { BEM } from '../../../utils/bem';
import { InfoIcon } from '../notifications/icons/InfoIcon';
import './MainArticle.less';
import { xpPathToUrl } from '../../../utils/paths';


function getExtensionForImage(contentId: string) {
    /*
    const mimeTypes = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/gif': 'gif',
        'image/svg+xml': 'svg',
    };
    const content = libs.content.get({ key: contentId });
    if (content) {
        const imageInfo = content.x && content.x.media ? content.x.media.imageInfo : false;

        if (imageInfo) {
            return mimeTypes[imageInfo.contentType] || '';
        }
    }

     */
    return '';
}

/**
 * Get the imageUrl for a contentId, wrapper to portal.imageUrl to handle extensions correctly
 * @param {String} contentId The id of the content.
 * scale is default blank
 */

function getImageUrl(contentId: string, scale: string = '') {
    /*
    const extension = getExtensionForImage(contentId);
    return libs.portal.imageUrl({
        id: contentId,
        format: extension,
        scale,
    });

    */
    return '';
}

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

function getDate(content: Partial<MainArticleProps |  MainArticleChapterProps> ) {
    if (!content) {
        return '';
    }
    const p = (content.publish?.from ? content.publish?.from : content.createdTime);
    // TODO: oversett
    const published = `Publisert: ${formatDate(p)}`;
    const publishedString = `${published}`;

    let modifiedString = '';
    const m = (content.modifiedTime);
    if (new Date(m) > new Date(p)) {
        // TODO: oversett
        const lastModified = `Sist endret: ${formatDate(content.modifiedTime) }`;
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

// Todo: Oversett
const titles = {
    facts: 'FAKTA',
    innholdsfortegnelse : 'Innholdsfortegnelse'
};

type Article = MainArticleProps | MainArticleChapterProps

function isMainArticleChapter(props: Article): props is MainArticleChapterProps {
    return (props.__typename === ContentType.MainArticleChapter)
}

function getData(props: MainArticleProps | MainArticleChapterProps) {
    if (props.__typename === ContentType.TemplatePage) {
        return MainArticleMock as PageData;
    }
    return isMainArticleChapter(props) ? props.data.article.data : props.data;
}

function getSocialRef(el: string, displayName: string, requestUrl: string) {
    if (!requestUrl) {
        return null;
    }
    switch (el) {
        case 'facebook':
            return (
                'https://www.facebook.com/sharer/sharer.php?u=' +
                requestUrl +
                '&amp;title=' +
                displayName?.replace(/ /g, '%20')
            );
        case 'twitter':
            return (
                'https://twitter.com/intent/tweet?text=' +
                displayName?.replace(/ /g, '%20') +
                ': ' +
                requestUrl
            );
        case 'linkedin':
            return (
                'https://www.linkedin.com/shareArticle?mini=true&amp;url=' +
                requestUrl +
                '&amp;title=' +
                displayName?.replace(/ /g, '%20') +
                '&amp;source=nav.no'
            );
        default:
            return null;
    }
}
export const MainArticle = (props: Article) => {
    const bem = BEM('main-article');

    const data = getData(props);
    const content = isMainArticleChapter(props) ? props.data.article : props;

    console.log('data', data);
    console.log('content', content);
    const innholdsfortegnelse = data.hasTableOfContents && data.hasTableOfContents !== 'none' ?
        parseInnholdsfortegnelse(data.text) : [];

    const socialMedia = data.social?.map((el) => {
            let tmpText = 'Del på ';
            if (el === 'linkedin') {
                tmpText += 'LinkedIn';
            } else if (el === 'facebook') {
                tmpText += 'Facebook';
            } else {
                tmpText += 'Twitter';
            }
            return {
                type: el,
                text: tmpText,
                href: getSocialRef(el, content.displayName, xpPathToUrl(content._path))
            };
        });

    let imageObj = null;
    if (!!data.picture && data.picture.target) {
        const { caption, altText, target, size } = data.picture;
        const imgClass =
            // eslint-disable-next-line no-nested-ternary
            size === '40' ? 'figure-small' : size === '70' ? 'figure-medium' : 'figure-full';
        imageObj = {
            url: getImageUrl(target, 'max(768)'),
            imgClass,
            caption,
            altText,
        };
    }

    return (
        <article
            id="pagecontent"
            className={bem()}
        >
            <header className="article-head">
                <time dateTime={content.publish?.from}>
                    {getDate(content)}
                </time>
                <h1>{content.displayName}</h1>
                <p className="preface">{data.ingress}</p>
                { data.hasTableOfContents && data.hasTableOfContents !== 'none' &&
                    <nav className="table-of-contents" data-selected-id>
                      <h2 className="visuallyhidden">
                          {titles.innholdsfortegnelse}
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
            <div className={bem('text')}>
                <ParsedHtml content={cleanupHtml( data.text)}/>
            </div>

            {!!data.fact &&
                <div className={bem('facts')}>
                  <InfoIcon />
                  <h3 className="decorated">{titles.facts}</h3>
                  <ParsedHtml content={data.fact} />
                </div>
            }

            { socialMedia.length > 0 &&
                <div className={bem('social-media')}>
                    <ul className="share-social-media-pills">
                        {socialMedia.map(item => (
                            <li key={item.type}>
                                <a
                                    data-ga="share-social-media"
                                    className="js-share share-container"
                                    data-th-attr="data-medium=${social.type}"
                                    href={item.href}
                                >
                                      <span className={`share-social share-${item.type}`}>
                                         {item.text}
                                      </span>
                                </a>
                            </li>
                        ))

                        }

                    </ul>
                </div>
            }
            {/*


            <div data-th-if="${imageObj}" className="figure-container">
                <figure data-th-class="${imageObj.imgClass}">
                    <img
                        data-th-if="${imageObj.altText != ''}"
                        data-th-src="${imageObj.url}"
                        data-th-alt="${imageObj.altText}"
                        src=""
                        alt=""
                    />
                    <img data-th-if="${imageObj.altText == ''}" data-th-src="${imageObj.url}" src="" alt="" />
                    <figcaption className="decorated" data-th-if="${imageObj.caption}">
                        [[${imageObj.caption}]]
                    </figcaption>
                </figure>
            </div>


            */}
        </article>

    );
};
