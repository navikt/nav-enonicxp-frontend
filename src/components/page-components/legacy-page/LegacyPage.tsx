import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { enonicLegacyPath } from 'utils/paths';
import { LegacyProps } from 'types/content-types/legacy-props';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Head from 'next/head';
import { LenkeUstylet } from '../../part-components/_common/lenke/LenkeUstylet';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './LegacyPage.less';

const xpOrigin = process.env.XP_ORIGIN;

const parseLegacyHtml = (htmlString: string) => {
    const replaceAccordionHeader = {
        replace: ({ name, children }: DomElement) => {
            if (name?.toLowerCase() === 'a' && children) {
                return <>{domToReact(children)}</>;
            }
            return children;
        },
    };

    const replaceAccordion = {
        replace: ({ attribs, children }: DomElement) => {
            if (attribs?.class.includes('accordion-item') && children) {
                const [header, content] = children.filter((c) => !!c.attribs);

                return header.children && content.children ? (
                    <Ekspanderbartpanel
                        tittel={domToReact(
                            header.children,
                            replaceAccordionHeader
                        )}
                        apen={attribs?.['data-expand'] === 'true'}
                        className={'legacy-container__expanding-panel'}
                        key={Math.random()}
                    >
                        {domToReact(content.children, replaceBodyElements)}
                    </Ekspanderbartpanel>
                ) : (
                    <Fragment />
                );
            }
        },
    };

    const replaceBodyElements = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (name?.toLowerCase() === 'time') {
                return (
                    <Normaltekst tag={'time'}>
                        {children && domToReact(children)}
                    </Normaltekst>
                );
            }

            if (name?.toLowerCase() === 'h1') {
                return (
                    <Innholdstittel>
                        {children && domToReact(children)}
                    </Innholdstittel>
                );
            }

            if (name?.toLowerCase() === 'a' && attribs?.href) {
                const href = attribs.href
                    .replace(enonicLegacyPath, '')
                    .replace('https://www.nav.no', '');

                const props = attributesToProps(attribs);

                return (
                    <LenkeUstylet
                        {...props}
                        href={href}
                        className={`lenke ${props.className || ''}`}
                    >
                        {children && domToReact(children)}
                    </LenkeUstylet>
                );
            }

            if (attribs?.id === 'related-content-accordion') {
                return (
                    <>{children && domToReact(children, replaceAccordion)}</>
                );
            }
        },
    };

    const replaceHeadElements = {
        replace: ({ name, attribs }: DomElement) => {
            const href = attribs?.href
                ? attribs?.href?.charAt(0) === '/'
                    ? `${xpOrigin}${attribs.href.replace(enonicLegacyPath, '')}`
                    : attribs.href
                : undefined;

            const src = attribs?.src
                ? attribs?.src?.charAt(0) === '/'
                    ? `${xpOrigin}${attribs.src.replace(enonicLegacyPath, '')}`
                    : attribs.src
                : undefined;

            const props = attributesToProps(attribs);
            return React.createElement(name, { ...props, href, src });
        },
    };

    const headAndMainContentOnly = {
        replace: ({ name, children, parent }: DomElement) => {
            if (name?.toLowerCase() === 'head' && children) {
                return (
                    <Head>
                        <>{domToReact(children, replaceHeadElements)}</>
                    </Head>
                );
            }

            if (parent?.attribs?.id === 'maincontent') {
                return (
                    <Fragment>
                        {children ? (
                            domToReact(children, replaceBodyElements)
                        ) : (
                            <Fragment />
                        )}
                    </Fragment>
                );
            } else if (children) {
                return (
                    <Fragment>
                        {domToReact(children, headAndMainContentOnly)}
                    </Fragment>
                );
            } else {
                return <Fragment />;
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        htmlString.replace(/(\r\n|\n|\r)/gm, ''),
        headAndMainContentOnly
    );

    return <>{htmlParsed}</>;
};

export const LegacyPage = (contentData: LegacyProps) => {
    return (
        <Fragment>
            <Head>
                <script
                    type="text/javascript"
                    src={`${process.env.APP_ORIGIN}/legacy/scripts/navno.js`}
                />
            </Head>
            <div className={'legacy-container'}>
                {contentData.data?.html &&
                    parseLegacyHtml(contentData.data.html)}
            </div>
        </Fragment>
    );
};

export default LegacyPage;
