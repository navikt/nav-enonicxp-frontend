import React from 'react';
import { PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { MainArticleMock } from './MainArticleMock';
import { ParsedHtml } from '../_dynamic/ParsedHtml';
import { MainArticleProps } from '../../../types/content-types/main-article-props';
import { MainArticleChapterProps } from '../../../types/content-types/main-article-chapter-props';
import { BEM } from '../../../utils/bem';
import { translator } from 'translations';
import Innholdsfortegnelse from './Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import Faktaboks from './Faktaboks';
import Bilde from './Bilde';
import './MainArticle.less';

const cleanupHtml = (htmlText: string) => {
    // Fjern tomme headings og br-tagger fra HTML
    let cleanHtml = htmlText;
    cleanHtml = cleanHtml?.replace(/<h\d>\s*<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<br \/>/g, '');
    return cleanHtml;
}

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


export const MainArticle = (props: Article) => {
    const bem = BEM('main-article');
    const data = getData(props);
    const content = isMainArticleChapter(props) ? props.data.article : props;
    const getLabel = translator('mainArticle', props.language);

    console.log(content)
    return (
        <article
            id="pagecontent"
            className={bem()}
        >
            <header className="article-head">
                <ArtikkelDato
                    publish={content.publish}
                    createdTime={content.createdTime}
                    modifiedTime={content.modifiedTime}
                    publishLabel={getLabel('published')}
                    modifiedLabel={getLabel('lastChanged')}
                />
                <h1>{content.displayName}</h1>
                <p className="preface">{data.ingress}</p>
                { data.hasTableOfContents && data.hasTableOfContents !== 'none' &&
                    <Innholdsfortegnelse
                        innhold={data.text}
                        label={getLabel('tableOfContents')}
                    />
                }
            </header>
            <div className={bem('text')}>
                <ParsedHtml content={cleanupHtml( data.text)}/>
            </div>
            <Faktaboks
                fakta={data.fact}
                label={getLabel('facts')}
                wrapperClass={bem('facts')}
            />
            <SosialeMedier
                social={data.social}
                displayName={content.displayName}
                contentPath={content._path}
            />

            <Bilde picture={data.picture} />

        </article>
    );
};
