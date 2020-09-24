import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { isEnonicPath, legacyPathPrefix } from '../../../utils/paths';
import { LegacyProps } from '../../../types/content-types/legacy-props';
import Link from 'next/link';
import './LegacyPage.less';

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

    const mainContentOnly = {
        replace: ({ children, parent }: DomElement) => {
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
                return <>{domToReact(children, mainContentOnly)}</>;
            } else {
                return <Fragment />;
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        htmlString.replace(/(\r\n|\n|\r)/gm, ''),
        mainContentOnly
    );

    return <>{htmlParsed}</>;
};

export const LegacyPage = (contentData: LegacyProps) => {
    return (
        <div className={'legacy-container'}>
            {contentData.data?.html && parseLegacyHtml(contentData.data.html)}
        </div>
    );
};

export default LegacyPage;
