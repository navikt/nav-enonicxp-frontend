import React from 'react';
import { BEM } from '../../../../utils/classnames';
import { translator } from 'translations';
import { Heading, Ingress } from '@navikt/ds-react';
import Innholdsfortegnelse from './innholdsfortegnelse/Innholdsfortegnelse';
import SosialeMedier from './SosialeMedier';
import ArtikkelDato from './ArtikkelDato';
import { Faktaboks } from './Faktaboks';
import Bilde from './Bilde';
import MainArticleText from './MainArticleText';
import { parseInnholdsfortegnelse } from './innholdsfortegnelse/parseInnholdsfortegnelse';
import { ContentType } from '../../../../types/content-props/_content-common';
import { MainArticleProps } from '../../../../types/content-props/main-article-props';
import { MainArticleChapterProps } from '../../../../types/content-props/main-article-chapter-props';
import ErrorPage404 from '../../../../pages/404';

export const MainArticle = (
    propsInitial: MainArticleProps | MainArticleChapterProps
) => {
    const props =
        propsInitial.__typename === ContentType.MainArticleChapter
            ? propsInitial.data.article
            : propsInitial;

    // Any other type than main-article should have resulted in a redirect
    // This condition should never be true (famous last words :)
    if (props.__typename !== ContentType.MainArticle) {
        console.error(
            `Misplaced MainArticle part on content type ${props.__typename} - ${props._path} - ${props._id}`
        );
        return <ErrorPage404 />;
    }

    const { data } = props;
    const bem = BEM('main-article');
    const getLabel = translator('mainArticle', props.language);
    const hasTableOfContest =
        data?.hasTableOfContents && data?.hasTableOfContents !== 'none';

    const innholdsfortegnelse = parseInnholdsfortegnelse(
        data.text?.processedHtml,
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
                <Heading
                    level="1"
                    size="xlarge"
                    className={bem('title')}
                    spacing
                >
                    {props.displayName}
                </Heading>
                {data.ingress && <Ingress>{data.ingress}</Ingress>}
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
