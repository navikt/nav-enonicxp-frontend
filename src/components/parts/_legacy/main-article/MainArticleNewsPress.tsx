import React, { useEffect } from 'react';
import classNames from 'classnames';
import { translator } from 'translations';
import { Ingress } from '@navikt/ds-react';
import Innholdsfortegnelse from './komponenter/Innholdsfortegnelse';
import { SosialeMedier } from './komponenter/SosialeMedier';
import ArtikkelDato from './komponenter/ArtikkelDato';
import { Faktaboks } from './komponenter/Faktaboks';
import { Bilde } from './komponenter/Bilde';
import MainArticleText from './komponenter/MainArticleText';
import { parseInnholdsfortegnelse } from './komponenter/parseInnholdsfortegnelse';
import { ContentType } from '../../../../types/content-props/_content-common';
import { MainArticleProps } from '../../../../types/content-props/main-article-props';
import { MainArticleChapterProps } from '../../../../types/content-props/main-article-chapter-props';
import ErrorPage404 from '../../../../pages/404';
import { NewsPressHeader } from './komponenter/NewsPressHeader';

import style from './MainArticleNewsPress.module.scss';

type Props = MainArticleProps | MainArticleChapterProps;

// Get props from the chapter article if the content is a chapter
const getPropsToRender = (propsInitial: Props) => {
    if (propsInitial.type !== ContentType.MainArticleChapter) {
        return propsInitial;
    }

    const articleProps = propsInitial.data?.article;

    if (articleProps?.type === ContentType.MainArticle) {
        return articleProps;
    }

    // Any other article type than main-article should have resulted in a redirect
    // This branch should never happen (famous last words :)
    return null;
};

export const MainArticleNewsPress = (propsInitial: Props) => {
    const props = getPropsToRender(propsInitial);

    const updateMenuOffset = () => {
        const header = document.getElementById('main-article-header-anchor');
        const dateAnchor = document.getElementById('main-article-date-anchor');

        if (dateAnchor && header) {
            const headerTop = header.getBoundingClientRect().top;
            const dateAnchorTop = dateAnchor.getBoundingClientRect().top;

            const menuOffsetTop =
                window.innerWidth > 768 ? dateAnchorTop - headerTop : 0;

            const chapterContainer =
                document.getElementById('chapter-container');
            const linkListContainer = document.getElementById(
                'link-list-container'
            );

            const isMobile = window.innerWidth < 768;

            if (chapterContainer && !isMobile) {
                chapterContainer.style.marginTop = `${menuOffsetTop - 32}px`;
            } else if (linkListContainer && !isMobile) {
                linkListContainer.style.marginTop = `${menuOffsetTop}px`;
            } else {
                if (chapterContainer) {
                    chapterContainer.style.marginTop = '0';
                }
                if (linkListContainer) {
                    linkListContainer.style.marginTop = '0';
                }
            }
        }
    };

    useEffect(() => {
        updateMenuOffset();
        window.addEventListener('resize', updateMenuOffset);

        return () => {
            window.removeEventListener('resize', updateMenuOffset);
        };
    }, []);

    if (!props) {
        console.error(
            `Misplaced MainArticle part on content type ${propsInitial.type} - ${propsInitial._path} - ${propsInitial._id}`
        );
        return <ErrorPage404 />;
    }
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
        <article className={classNames(style.newsPressArticle)}>
            <header className={headerClassName} id="main-article-header-anchor">
                <NewsPressHeader
                    type={data.contentType}
                    title={props.displayName}
                    language={props.language}
                />
                <ArtikkelDato
                    publish={props.publish}
                    createdTime={props.createdTime}
                    modifiedTime={props.modifiedTime}
                    publishLabel={getLabel('published')}
                    modifiedLabel={getLabel('lastChanged')}
                    type="newsPress"
                />
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
                version="2"
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
