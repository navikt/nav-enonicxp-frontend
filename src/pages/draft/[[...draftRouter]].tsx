import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = context.req.headers.secret as string;
    const pathSegments = context?.params?.draftRouter;

    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    return await fetchPageProps(pathSegments, true, secret);
};

export default PageBase;
