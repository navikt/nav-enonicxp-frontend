import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = process.env.SERVICE_SECRET as string;
    const pathSegments = context?.resolvedUrl.split('/').slice(1) || '';
    console.log('ssr', pathSegments);
    return await fetchPageProps(pathSegments, false, secret);
};

export default PageBase;
