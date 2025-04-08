import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import ArtikkelDato from 'components/parts/_legacy/main-article/komponenter/ArtikkelDato';
import { Innholdsfortegnelse } from 'components/parts/_legacy/main-article/komponenter/Innholdsfortegnelse';
import { MainArticleText } from 'components/parts/_legacy/main-article/komponenter/MainArticleText';
import { Faktaboks } from 'components/parts/_legacy/main-article/komponenter/Faktaboks';
import { SosialeMedier } from 'components/parts/_legacy/main-article/komponenter/SosialeMedier';
import { Bilde } from 'components/parts/_legacy/main-article/komponenter/Bilde';
import { translator } from 'translations';
import { parseInnholdsfortegnelse } from 'components/parts/_legacy/main-article/komponenter/parseInnholdsfortegnelse';

import { createTypeGuard } from 'types/_type-guards';
import { MainArticleData } from 'types/content-props/main-article-props';
import stylePermanent from './MainArticlePermanent.module.scss';
import styleNews from './MainArticleNewsPress.module.scss';

const isValidContentType = createTypeGuard([
    ContentType.MainArticle,
    ContentType.MainArticleChapter,
    ContentType.Melding,
] as const);

export const MainArticleLegacyPart = (propsInitial: ContentProps) => {
    if (!isValidContentType(propsInitial.type)) {
        return null;
    }

    const props =
        propsInitial.type === ContentType.MainArticleChapter
            ? propsInitial.data.article
            : propsInitial;
    if (!props) {
        return null;
    }

    const { language, displayName, _path } = props;
    const data = props.data as MainArticleData;

    const isNewsArticle = data.contentType === 'news' || data.contentType === 'pressRelease';

    const style = isNewsArticle ? styleNews : stylePermanent;

    const getLabel = translator('mainArticle', language);

    const hasTableOfContents = !!(data.hasTableOfContents && data.hasTableOfContents !== 'none');

    const innholdsfortegnelse = parseInnholdsfortegnelse(
        data.text?.processedHtml,
        hasTableOfContents
    );

    const headerClassName = innholdsfortegnelse.length === 0 ? style.header : style.headerWithToc;

    return (
        <article className={style.article}>
            <header className={headerClassName}>
                <ArtikkelDato contentProps={props} type={isNewsArticle ? 'newsPress' : 'normal'} />
                {!isNewsArticle && (
                    <Heading level={'1'} size={'xlarge'} className={style.title} spacing>
                        {displayName}
                    </Heading>
                )}
                {data.ingress && <BodyLong size={'large'}>{data.ingress}</BodyLong>}
                <Innholdsfortegnelse
                    innholdsfortegnelse={innholdsfortegnelse}
                    label={getLabel('tableOfContents')}
                />
            </header>
            {data.text && (
                <MainArticleText
                    htmlProps={data.text}
                    className={style.text}
                    hasTableOfContents={hasTableOfContents}
                />
            )}
            {data.fact && (
                <Faktaboks
                    fakta={data.fact}
                    label={getLabel('facts')}
                    version={isNewsArticle ? '2' : '1'}
                />
            )}
            {data.social && (
                <SosialeMedier social={data.social} displayName={displayName} contentPath={_path} />
            )}
            <Bilde picture={data.picture} />
        </article>
    );
};
