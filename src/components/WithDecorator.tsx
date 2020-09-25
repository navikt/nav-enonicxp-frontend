import React from 'react';
import parse from 'html-react-parser';
import Head from 'next/head';

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

const ParsedHtml = ({ html }: { html: string | null }) =>
    html ? <>{parse(html)}</> : null;

let counter = 0;

export const WithDecorator = ({
    fragments: { HEADER, FOOTER, SCRIPTS, STYLES },
    children,
}: Props) => {
    counter++;
    console.log('scripts:', counter, SCRIPTS);
    return (
        <>
            <Head>
                <ParsedHtml html={STYLES} />
            </Head>
            <ParsedHtml html={HEADER} />
            {children}
            <ParsedHtml html={FOOTER} />
            <ParsedHtml html={SCRIPTS} />
        </>
    );
};

export default WithDecorator;
