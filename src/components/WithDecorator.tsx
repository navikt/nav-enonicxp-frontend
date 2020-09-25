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

const decUrl = process.env.DECORATOR_URL;
const ClientStyles = () => <link href={`${decUrl}/css/client.css`} />;
const ClientHeader = () => <div id="decorator-header" />;
const ClientFooter = () => <div id="decorator-footer" />;
const ClientScripts = () => (
    <>
        <div id="decorator-env" data-src={`${decUrl}`} />
        <script src={`${decUrl}/client.js`} />
    </>
);

export const WithDecorator = ({
    fragments: { HEADER, FOOTER, SCRIPTS, STYLES },
    children,
}: Props) => {
    return (
        <>
            <Head>{STYLES ? parse(STYLES) : <ClientStyles />}</Head>
            {HEADER ? parse(HEADER) : <ClientHeader />}
            {children}
            {FOOTER ? parse(FOOTER) : <ClientFooter />}
            {SCRIPTS ? parse(SCRIPTS) : <ClientScripts />}
        </>
    );
};

export default WithDecorator;
