import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { isEnonicPath } from '../../../utils/enonic-path';
import { NotImplementedSchema } from '../../../types/schemas/not-implemented-schema';
import './LegacyStyle.less';
import Link from 'next/link';

// TODO: flytt dette til en enonic-service?
const parseLegacyHtml = (htmlString: string) => {
    const linkOptions = {
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

    const options = {
        replace: ({ name, attribs, children, parent }: DomElement) => {
            if (
                name === 'html' ||
                name === 'body' ||
                attribs?.id === 'page-top' ||
                attribs?.class === 'content-page'
            ) {
                return <>{children && domToReact(children, options)}</>;
            } else if (
                parent?.attribs?.id === 'maincontent' &&
                attribs?.class.includes('maincontent')
            ) {
                return <>{children && domToReact(children, linkOptions)}</>;
            } else {
                return <Fragment />;
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

export const LegacyHtml = (contentData: NotImplementedSchema) => {
    return (
        <div className={'legacy-container'}>
            {parseLegacyHtml(contentData.data.html)}
        </div>
    );
};

export default LegacyHtml;
