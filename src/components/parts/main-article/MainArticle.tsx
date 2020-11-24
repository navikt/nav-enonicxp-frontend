import React from 'react';
import { MainArticleMock } from './MainArticleMock';
import { BEM } from '../../../utils/bem';
import { translator } from 'translations';
import Innholdsfortegnelse from './innholdsfortegnelse/Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import Faktaboks from './Faktaboks';
import Bilde from './Bilde';
import MainArticleText from './MainArticleText';
import { parseInnholdsfortegnelse } from './innholdsfortegnelse/parseInnholdsfortegnelse';
import { MainArticleProps } from '../../../types/content-props/main-article-props';
import { ArticleProps } from '../../../types/content-props/main-article-chapter-props';
import './MainArticle.less';
import { ContentType } from '../../../types/content-props/_content-common';

export const MainArticle = (props2: MainArticleProps | ArticleProps) => {
    const props =
        props2.__typename === ContentType.MainArticleChapter
            ? props2.data.article
            : props2;
    const bem = BEM('main-article');
    const data =
        props.__typename === ContentType.TemplatePage
            ? MainArticleMock
            : props.data;
    const getLabel = translator('mainArticle', props.language);
    const hasTableOfContest =
        data.hasTableOfContents && data.hasTableOfContents !== 'none';
    const innholdsfortegnelse = parseInnholdsfortegnelse(
        data.text,
        hasTableOfContest
    );

    return (
        <article className={bem()}>
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
                <Innholdsfortegnelse
                    innholdsfortegnelse={innholdsfortegnelse}
                    label={getLabel('tableOfContents')}
                />
            </header>
            <MainArticleText
                text={data.text}
                className={bem('text')}
                hasTableOfContents={hasTableOfContest}
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
