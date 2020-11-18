import React from 'react';
import { PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { MainArticleMock } from './MainArticleMock';
import { MainArticleProps } from '../../../types/content-types/main-article-props';
import { ArticleProps } from '../../../types/content-types/main-article-chapter-props';
import { BEM } from '../../../utils/bem';
import { translator } from 'translations';
import Innholdsfortegnelse, { parseInnholdsfortegnelse } from './Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import Faktaboks from './Faktaboks';
import Bilde from './Bilde';
import MainArticleText from './MainArticleText';
import './MainArticle.less';

export const MainArticle = (props: MainArticleProps | ArticleProps) => {
    const bem = BEM('main-article');
    const data = props.__typename === ContentType.TemplatePage
            ? (MainArticleMock  as PageData)
            : props.data;
    const getLabel = translator('mainArticle', props.language);
    const {innholdsfortegnelse, modifiedHtml} = parseInnholdsfortegnelse(data.text);

    return (
        <article
            className={bem()}
        >
            <header className={bem('header')}>
                <ArtikkelDato
                    publish={props.publish}
                    createdTime={props.createdTime}
                    modifiedTime={props.modifiedTime}
                    publishLabel={getLabel('published')}
                    modifiedLabel={getLabel('lastChanged')}
                />
                <h1>{props.displayName}</h1>
                <p className={bem('preface')}>{data.ingress}</p>
                { data.hasTableOfContents && data.hasTableOfContents !== 'none' &&
                    <Innholdsfortegnelse
                        innholdsfortegnelse={innholdsfortegnelse}
                        label={getLabel('tableOfContents')}
                    />
                }
            </header>
            <MainArticleText
                text={modifiedHtml}
                className={bem('text')}
            />
            <Faktaboks
                fakta={data.fact}
                label={getLabel('facts')}
                className={bem('facts')}
            />
            <SosialeMedier
                social={data.social}
                displayName={props.displayName}
                contentPath={props._path}
            />
            <Bilde picture={data.picture} />
        </article>
    );
};
