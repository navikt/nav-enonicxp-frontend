import React from 'react';
import { BEM } from '../../../utils/classnames';
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
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { getProcessedHtmlPropsWithBackwardsCompatibility } from '../../../types/processed-html-props';
import './MainArticle.less';

export const MainArticle = (propsInitial: ContentProps) => {
    const props =
        propsInitial.__typename === ContentType.MainArticleChapter
            ? propsInitial.data.article
            : propsInitial;

    const { data } = props;
    const bem = BEM('main-article');
    const getLabel = translator('mainArticle', props.language);
    const hasTableOfContest =
        data?.hasTableOfContents && data?.hasTableOfContents !== 'none';

    const html = getProcessedHtmlPropsWithBackwardsCompatibility(data.text);
    const innholdsfortegnelse = parseInnholdsfortegnelse(
        html.processedHtml,
        hasTableOfContest
    );
    const headerClassName =
        innholdsfortegnelse.length === 0
            ? bem('header')
            : bem('header-med-toc');

    return (
        <article className={bem()}>
            <header className={headerClassName}>
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
                {data.ingress && (
                    <Normaltekst className={bem('preface')}>
                        {data.ingress}
                    </Normaltekst>
                )}
                <Innholdsfortegnelse
                    innholdsfortegnelse={innholdsfortegnelse}
                    label={getLabel('tableOfContents')}
                />
            </header>
            <MainArticleText
                htmlProps={data.text}
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
