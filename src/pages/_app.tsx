import React from 'react';
import type { AppProps } from 'next/app';
import parse from 'html-react-parser';
import Head from 'next/head';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    const { decorator } = pageProps;

    return (
        <>
            <Head>{decorator?.STYLES ? parse(decorator?.STYLES) : null}</Head>
            {decorator?.HEADER ? parse(decorator?.HEADER) : null}
            <div className={'app'}>
                <div className={'content-wrapper'} id={'maincontent'}>
                    <Component {...pageProps} />
                </div>
            </div>
            {decorator?.FOOTER ? parse(decorator?.FOOTER) : null}
            {decorator?.SCRIPTS &&
                parse(decorator?.SCRIPTS, {
                    replace: ({ type, attribs }) => {
                        if (typeof document !== 'undefined') {
                            if (type === 'script') {
                                const script = document.createElement('script');
                                script.src = attribs.src;
                                document.head.appendChild(script);
                            }
                        }
                    },
                })}
        </>
    );
};

export default App;
