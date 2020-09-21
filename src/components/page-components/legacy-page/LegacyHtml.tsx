import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import { isEnonicPath } from '../../../utils/paths';
import { NotImplementedProps } from '../../../types/content-types/not-implemented-props';
import Link from 'next/link';
import './LegacyStyle.less';

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
        replace: ({ children, parent }: DomElement) => {
            if (parent?.attribs?.id === 'maincontent') {
                return <>{children && domToReact(children, linkOptions)}</>;
            } else if (!children) {
                return <Fragment />;
            } else {
                return <>{children && domToReact(children, options)}</>;
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

export const LegacyHtml = (contentData: NotImplementedProps) => {
    return (
        <div className={'legacy-container'}>
            {parseLegacyHtml(contentData.data.html)}
        </div>
    );
};

export default LegacyHtml;
