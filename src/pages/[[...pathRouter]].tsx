import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';

export const getStaticProps: GetStaticProps = async (context) => {
    const secret = process.env.SERVICE_SECRET as string;
    return await fetchPageProps(context?.params?.pathRouter, false, secret, 1);
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;
