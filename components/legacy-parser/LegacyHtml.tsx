import React, { Dispatch, useEffect, useState, Fragment } from 'react';
import { ContentTypeSchemas } from '../../types/schemas/_schemas';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { appPathToEnonicPath, isNavnoPath } from '../../utils/enonic-ref';
import Link from 'next/link';

// TODO: flytt dette til en enonic-service?
const parseLegacyHtml = (htmlString: string) => {
    const options = {
        replace: ({ name, attribs, children, parent }: DomElement) => {
            if (name === 'html' || name === 'body') {
                return <>{children && domToReact(children, options)}</>;
            }

            if (
                name === 'head' ||
                name === 'script' ||
                (parent?.name === 'body' && attribs?.id !== 'page-top') ||
                (parent?.attribs?.id === 'page-top' &&
                    attribs?.id !== 'maincontent')
            ) {
                return <Fragment />;
            }

            if (
                name?.toLowerCase() === 'a' &&
                attribs?.href &&
                isNavnoPath(attribs.href)
            ) {
                const enonicPath = appPathToEnonicPath(
                    attribs.href
                        .split('nav.no')
                        .filter((_, i, a) => i === a.length - 1)[0]
                );
                return (
                    <Link {...attribs} className={attribs?.class}>
                        {children && domToReact(children)}
                    </Link>
                );
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        htmlString.replace(/(\r\n|\n|\r)/gm, ''),
        options
    );

    return <>{htmlParsed}</>;
};

export const LegacyHtml = (contentData: ContentTypeSchemas) => {
    return <div className={'legacy-container'}>{parseLegacyHtml(html)}</div>;
};

export default LegacyHtml;
