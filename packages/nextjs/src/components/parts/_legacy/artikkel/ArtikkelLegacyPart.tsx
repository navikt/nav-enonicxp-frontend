import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { translator } from 'translations';
import { createTypeGuard } from 'types/_type-guards';
import { ArtikkelData } from 'types/content-props/artikkel-props';
import ArtikkelDato from './komponenter/ArtikkelDato';
import { Innholdsfortegnelse } from './komponenter/Innholdsfortegnelse';
import { Artikkeltekst } from './komponenter/Artikkeltekst';
import { Faktaboks } from './komponenter/Faktaboks';
import { SosialeMedier } from './komponenter/SosialeMedier';
import { Bilde } from './komponenter/Bilde';
import { parseInnholdsfortegnelse } from './komponenter/parseInnholdsfortegnelse';

import stylePermanent from './ArtikkelPermanent.module.scss';
import styleNews from './ArtikkelNewsPress.module.scss';

const isValidContentType = createTypeGuard([
    ContentType.Artikkel,
    ContentType.Kapittel,
    ContentType.Melding,
] as const);

export const ArtikkelLegacyPart = (propsInitial: ContentProps) => {
    if (!isValidContentType(propsInitial.type)) {
        return null;
    }

    const props =
        propsInitial.type === ContentType.Kapittel ? propsInitial.data.article : propsInitial;
    if (!props) {
        return null;
    }

    const { language, displayName, _path } = props;
    const data = props.data as ArtikkelData;

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
        <article className={style.artikkel}>
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
                <Artikkeltekst
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
