import React from 'react';
import Head from 'next/head';
import { ContentProps } from 'types/content-props/_content-common';
import { getDecoratorParams } from 'utils/decorator-utils';
import { isLegacyContentType } from 'utils/content-types';

type Props = {
    content: ContentProps;
};

export enum DocumentParameter {
    DecoratorParams = '_decoratorParams',
    HtmlLang = '_htmlLang',
    DecoratorDisabled = 'decoratorDisabled',
    LegacyContentType = 'legacy',
}

const isServerSide = typeof window === 'undefined';

// This is used for passing data to the nextjs Document component
export const DocumentParameterMetatags = ({ content }: Props) => {
    if (!isServerSide) {
        return null;
    }

    const { type, editorView } = content;

    const decoratorParams = JSON.stringify(getDecoratorParams(content));

    return (
        <Head>
            <meta name={DocumentParameter.DecoratorParams} content={decoratorParams} />
            <meta name={DocumentParameter.HtmlLang} content={content.language} />
            {editorView === 'edit' && isLegacyContentType(type) && (
                <meta name={DocumentParameter.LegacyContentType} content={'true'} />
            )}
        </Head>
    );
};
//
