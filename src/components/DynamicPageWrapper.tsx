import React from 'react';
import { ContentTypeSchema } from '../types/content-types/_schema';
import Head from 'next/head';

type Props = {
    content: ContentTypeSchema;
    children: React.ReactNode;
};

export const DynamicPageWrapper = ({ content, children }: Props) => {
    return (
        <>
            <Head>
                <title>{`${content.displayName} - nav.no`}</title>
            </Head>
            {children}
        </>
    );
};

export default DynamicPageWrapper;
