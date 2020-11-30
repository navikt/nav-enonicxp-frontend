import React from 'react';
import { BEM } from '../../../utils/bem';
import { translator } from 'translations';
import Innholdsfortegnelse from './innholdsfortegnelse/Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import Faktaboks from './Faktaboks';
import Bilde from './Bilde';
import MainArticleText from './MainArticleText';
import { parseInnholdsfortegnelse } from './innholdsfortegnelse/parseInnholdsfortegnelse';
import {
    ContentType,
    ContentProps,
} from '../../../types/content-props/_content-common';
import './MainArticle.less';
import { Innholdstittel } from 'nav-frontend-typografi';

export const MainArticle = (propsInitial: ContentProps) => {
    const props =
        propsInitial.__typename === ContentType.MainArticleChapter
            ? propsInitial.data.article
            : propsInitial;

    const { data } = props;

    const bem = BEM('main-article');
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
                <Innholdstittel className={bem('title')}>
                    {props.displayName}
                </Innholdstittel>
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
