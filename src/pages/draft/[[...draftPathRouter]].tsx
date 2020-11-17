import React from 'react';
import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await fetchPageProps(context?.params?.draftPathRouter, true);
};

export default PageBase;
