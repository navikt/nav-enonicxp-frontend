import React from 'react';
import { translator } from 'translations';
import { Heading, Ingress } from '@navikt/ds-react';
import Innholdsfortegnelse from './komponenter/Innholdsfortegnelse';
import { SosialeMedier } from './komponenter/SosialeMedier';
import ArtikkelDato from './komponenter/ArtikkelDato';
import { Faktaboks } from './komponenter/Faktaboks';
import { Bilde } from './komponenter/Bilde';
import MainArticleText from './komponenter/MainArticleText';
import { parseInnholdsfortegnelse } from './komponenter/parseInnholdsfortegnelse';
import { MainArticleProps } from 'types/content-props/main-article-props';

import style from './MainArticlePermanent.module.scss';

export const MainArticlePermanent = (props: MainArticleProps) => {
    const { data } = props;

    const getLabel = translator('mainArticle', props.language);
    const hasTableOfContest =
        data?.hasTableOfContents && data?.hasTableOfContents !== 'none';

    const innholdsfortegnelse = parseInnholdsfortegnelse(
        data.text?.processedHtml,
        hasTableOfContest
    );

    const headerClassName =
        innholdsfortegnelse.length === 0 ? style.header : style.headerWithToc;

    return (
        <article className={style.mainArticle}>
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
                    className={style.title}
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
                className={style.text}
                hasTableOfContents={hasTableOfContest}
            />
            <Faktaboks fakta={data.fact} label={getLabel('facts')} />
            <SosialeMedier
                social={data.social}
                displayName={props.displayName}
                contentPath={props._path}
            />
            <Bilde picture={data.picture} />
        </article>
    );
};
