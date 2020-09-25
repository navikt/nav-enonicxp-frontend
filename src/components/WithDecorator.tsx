import React from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';

export const paramsObjectToQueryString = (params: object) =>
    encodeURI(
        Object.entries(params).reduce(
            (acc, [k, v], i) =>
                `${acc}${i ? '&' : ''}${k}=${JSON.stringify(v)}`,
            ''
        )
    );

export type DecoratorFragments = {
    HEADER: string | null;
    FOOTER: string | null;
    SCRIPTS: string | null;
    STYLES: string | null;
};

type Props = {
    fragments: DecoratorFragments;
    children: React.ReactNode;
};

export const WithDecorator = ({
    fragments: { HEADER, FOOTER, SCRIPTS, STYLES },
    children,
}: Props) => (
    <>
        {STYLES && <Head>{parse(STYLES)}</Head>}
        {HEADER && parse(HEADER)}
        {children}
        {FOOTER && parse(FOOTER)}
        {SCRIPTS && parse(SCRIPTS)}
    </>
);

export default WithDecorator;
