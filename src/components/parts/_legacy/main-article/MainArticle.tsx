import React from 'react';
import { ContentType } from 'types/content-props/_content-common';
import { MainArticleProps } from 'types/content-props/main-article-props';
import { MainArticleChapterProps } from 'types/content-props/main-article-chapter-props';
import ArtikkelDato from 'components/parts/_legacy/main-article/komponenter/ArtikkelDato';
import { Heading, Ingress } from '@navikt/ds-react';
import Innholdsfortegnelse from 'components/parts/_legacy/main-article/komponenter/Innholdsfortegnelse';
import MainArticleText from 'components/parts/_legacy/main-article/komponenter/MainArticleText';
import { Faktaboks } from 'components/parts/_legacy/main-article/komponenter/Faktaboks';
import { SosialeMedier } from 'components/parts/_legacy/main-article/komponenter/SosialeMedier';
import { Bilde } from 'components/parts/_legacy/main-article/komponenter/Bilde';
import { translator } from 'translations';
import { parseInnholdsfortegnelse } from 'components/parts/_legacy/main-article/komponenter/parseInnholdsfortegnelse';

import stylePermanent from './MainArticlePermanent.module.scss';
import styleNews from './MainArticleNewsPress.module.scss';

type Props = MainArticleProps | MainArticleChapterProps;

// Get props from the chapter article if the content is a chapter
const getPropsToRender = (propsInitial: Props) =>
    propsInitial.type === ContentType.MainArticleChapter
        ? propsInitial.data.article
        : propsInitial;

export const MainArticle = (propsInitial: Props) => {
    const props = getPropsToRender(propsInitial);

    const {
        data,
        language,
        publish,
        createdTime,
        modifiedTime,
        displayName,
        _path,
    } = props;

    const isNewsArticle =
        props.data.contentType === 'news' ||
        props.data.contentType === 'pressRelease';

    const style = isNewsArticle ? styleNews : stylePermanent;

    const getLabel = translator('mainArticle', language);
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
                    publish={publish}
                    createdTime={createdTime}
                    modifiedTime={modifiedTime}
                    publishLabel={getLabel('published')}
                    modifiedLabel={getLabel('lastChanged')}
                    type={isNewsArticle ? 'newsPress' : 'normal'}
                />
                {!isNewsArticle && (
                    <Heading
                        level={'1'}
                        size={'xlarge'}
                        className={style.title}
                        spacing
                    >
                        {displayName}
                    </Heading>
                )}
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
            <Faktaboks
                fakta={data.fact}
                label={getLabel('facts')}
                version={isNewsArticle ? '2' : '1'}
            />
            <SosialeMedier
                social={data.social}
                displayName={displayName}
                contentPath={_path}
            />
            <Bilde picture={data.picture} />
        </article>
    );
};
