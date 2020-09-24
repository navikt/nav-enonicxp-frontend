import React from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';

export type DecoratorFragments = {
    HEADER: string;
    FOOTER: string;
    SCRIPTS: string;
    STYLES: string;
};

type Props = {
    fragments: DecoratorFragments;
    children: React.ReactNode;
};

export const WithDecorator = ({
    fragments: { HEADER, FOOTER, SCRIPTS, STYLES },
    children,
}: Props) => {
    return (
        <>
            <Head>{parse(STYLES)}</Head>
            {parse(HEADER)}
            {children}
            {parse(FOOTER)}
            {parse(SCRIPTS)}
        </>
    );
};

export default WithDecorator;
