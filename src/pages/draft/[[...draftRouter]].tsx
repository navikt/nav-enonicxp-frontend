import React from 'react';
import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = context.req.headers.secret as string;
    return await fetchPageProps(context?.params?.draftRouter, true, secret);
};

export default PageBase;
