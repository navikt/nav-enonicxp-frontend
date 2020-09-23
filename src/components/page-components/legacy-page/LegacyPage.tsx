import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { isEnonicPath } from '../../../utils/paths';
import { LegacyProps } from '../../../types/content-types/legacy-props';
import Link from 'next/link';
import './LegacyPage.less';

const parseLegacyHtml = (htmlString: string) => {
    const replaceInternalLinks = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (
                name?.toLowerCase() === 'a' &&
                attribs?.href &&
                isEnonicPath(attribs.href)
            ) {
                return (
                    <Link href={attribs.href} passHref={true}>
                        <a {...attribs} className={attribs?.class}>
                            {children && domToReact(children)}
                        </a>
                    </Link>
                );
            }
        },
    };

    const mainContentOnly = {
        replace: ({ children, parent }: DomElement) => {
            if (parent?.attribs?.id === 'maincontent') {
                return (
                    <>
                        {children
                            ? domToReact(children, replaceInternalLinks)
                            : 'No page content found.'}
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
