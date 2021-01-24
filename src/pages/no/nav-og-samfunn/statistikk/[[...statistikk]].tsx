import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../../../components/PageBase';

const prefixSegments = ['no', 'nav-og-samfunn', 'statistikk'];
const secret = process.env.SERVICE_SECRET as string;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await fetchPageProps(
        [...prefixSegments, ...(context.params?.statistikk as string[])],
        false,
        secret
    );
};

export default PageBase;
