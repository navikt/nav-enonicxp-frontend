import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { enonicLegacyPath } from 'utils/paths';
import { LegacyProps } from 'types/content-types/legacy-props';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Head from 'next/head';
import { LenkeNavNo } from '../../part-components/_common/lenke-navno/LenkeNavNo';
import './LegacyPage.less';

const xpOrigin = process.env.XP_ORIGIN;

const parseLegacyHtml = (htmlString: string) => {
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

                if (href.startsWith('#')) {
                    return;
                }

                const props = attributesToProps(attribs);

                return (
                    <LenkeNavNo
                        href={href}
                        withChevron={false}
                        className={props.className}
                    >
                        {children && domToReact(children)}
                    </LenkeNavNo>
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

export const LegacyPage = (contentData: LegacyProps) => (
    <Fragment>
        <Head>
            <script
                type="text/javascript"
                src={`/legacygfx/scripts/navno.js`}
            />
        </Head>
        <div className={'legacy-container'}>
            {contentData.data?.html && parseLegacyHtml(contentData.data.html)}
        </div>
    </Fragment>
);

export default LegacyPage;
