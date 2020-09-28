import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { isEnonicPath, legacyPathPrefix } from '../../../utils/paths';
import { LegacyProps } from '../../../types/content-types/legacy-props';
import Link from 'next/link';
import Head from 'next/head';
import './LegacyPage.less';

const xpOrigin = process.env.XP_ORIGIN;

const parseLegacyHtml = (htmlString: string) => {
    const replaceInternalLinks = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (name?.toLowerCase() === 'a' && attribs?.href) {
                const href = attribs.href
                    .replace(legacyPathPrefix, '')
                    .replace('https://www.nav.no', '');
                const props = attributesToProps(attribs);
                return isEnonicPath(href) ? (
                    <Link href={href} passHref={true}>
                        <a {...props}>{children && domToReact(children)}</a>
                    </Link>
                ) : (
                    <a {...props} href={href}>
                        {children && domToReact(children)}
                    </a>
                );
            }
        },
    };

    const fixHeadHrefs = {
        replace: ({ name, attribs }: DomElement) => {
            const href = attribs?.href
                ? attribs?.href?.charAt(0) === '/'
                    ? `${xpOrigin}${attribs.href.replace(legacyPathPrefix, '')}`
                    : attribs.href
                : undefined;
            const src = attribs?.src
                ? attribs?.src?.charAt(0) === '/'
                    ? `${xpOrigin}${attribs.src.replace(legacyPathPrefix, '')}`
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
                        <>{domToReact(children, fixHeadHrefs)}</>
                    </Head>
                );
            }

            if (parent?.attribs?.id === 'maincontent') {
                return (
                    <>
                        {children ? (
                            domToReact(children, replaceInternalLinks)
                        ) : (
                            <Fragment />
                        )}
                    </>
                );
            } else if (children) {
                return <>{domToReact(children, headAndMainContentOnly)}</>;
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
        <>
            <Head>
                <script
                    type="text/javascript"
                    src={`/legacygfx/scripts/navno.js`}
                />
            </Head>
            <div className={'legacy-container'}>
                {contentData.data?.html &&
                    parseLegacyHtml(contentData.data.html)}
            </div>
        </>
    );
};

export default LegacyPage;
