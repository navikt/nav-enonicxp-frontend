import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';

export const getStaticProps: GetStaticProps = async (context) => {
    return await fetchPageProps(context?.params?.pathRouter, false, 1);
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;
