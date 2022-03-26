import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Head from 'next/head';
import { getDecoratorParams } from '../../../utils/decorator/decorator-utils';

type Props = {
    content: ContentProps;
};

export enum DocumentParameter {
    DecoratorParams = '_decoratorParams',
    HtmlLang = '_htmlLang',
    DecoratorDisabled = 'decoratorDisabled',
}

const isServerSide = typeof window === 'undefined';

// This is used for passing data to the nextjs Document component
export const DocumentParameterMetatags = ({ content }: Props) => {
    if (!isServerSide) {
        return null;
    }

    const decoratorParams = JSON.stringify(getDecoratorParams(content));

    return (
        <Head>
            <meta
                name={DocumentParameter.DecoratorParams}
                content={decoratorParams}
            />
            <meta
                name={DocumentParameter.HtmlLang}
                content={content.language}
            />
        </Head>
    );
};
//
