import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Head from 'next/head';
import { getDecoratorParams } from '../../../utils/decorator-utils';
import { objectToQueryString } from '../../../utils/fetch-utils';

type Props = {
    content: ContentProps;
};

const isServerSide = typeof window === 'undefined';

// These are used for injecting data into the _document component
export const ServerSideOnlyMetatags = ({ content }: Props) => {
    if (!isServerSide) {
        return null;
    }

    const decoratorParams = getDecoratorParams(content);

    return (
        <Head>
            <meta
                name="_decoratorQuery"
                content={objectToQueryString(decoratorParams)}
            />
            <meta name="_htmlLang" content={content.language} />
        </Head>
    );
};
//
