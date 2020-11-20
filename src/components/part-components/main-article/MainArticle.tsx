import React from 'react';
import { PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { MainArticleMock } from './MainArticleMock';
import { MainArticleProps } from '../../../types/content-types/main-article-props';
import { ArticleProps } from '../../../types/content-types/main-article-chapter-props';
import { BEM } from '../../../utils/bem';
import { translator } from 'translations';
import Innholdsfortegnelse from './innholdsfortegnelse/Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import Faktaboks from './Faktaboks';
import Bilde from './Bilde';
import MainArticleText from './MainArticleText';
import { parseInnholdsfortegnelse } from './innholdsfortegnelse/parseInnholdsfortegnelse';
import './MainArticle.less';

export const MainArticle = (props: MainArticleProps | ArticleProps) => {
    const bem = BEM('main-article');
    const data = props.__typename === ContentType.TemplatePage
            ? (MainArticleMock  as PageData)
            : props.data;
    const getLabel = translator('mainArticle', props.language);
    const hasTableOfContest = data.hasTableOfContents && data.hasTableOfContents !== 'none';
    const innholdsfortegnelse = parseInnholdsfortegnelse(data.text, hasTableOfContest);

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
