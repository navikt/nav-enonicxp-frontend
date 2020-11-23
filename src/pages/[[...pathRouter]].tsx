import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import dotenv from 'dotenv';

export const getStaticProps: GetStaticProps = async (context) => {
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
    }

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
