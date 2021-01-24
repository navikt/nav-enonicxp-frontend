import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Head from 'next/head';
import { getDecoratorParams } from '../../../utils/decorator-utils';
import { objectToQueryString } from '../../../utils/fetch-utils';

type Props = {
    content: ContentProps;
};

export enum DocumentParameter {
    DecoratorQuery = '_decoratorQuery',
    HtmlLang = '_htmlLang',
}

const isServerSide = typeof window === 'undefined';

// This is used for passing data to the nextjs Document component
export const DocumentParameterMetatags = ({ content }: Props) => {
    if (!isServerSide) {
        return null;
    }

    const decoratorQuery = objectToQueryString(getDecoratorParams(content));

    return (
        <Head>
            <meta
                name={DocumentParameter.DecoratorQuery}
                content={decoratorQuery}
            />
            <meta
                name={DocumentParameter.HtmlLang}
                content={content.language}
            />
        </Head>
    );
};
//
