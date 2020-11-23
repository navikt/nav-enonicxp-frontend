import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
}

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
