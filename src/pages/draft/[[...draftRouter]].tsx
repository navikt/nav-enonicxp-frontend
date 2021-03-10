import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

const isFrontpage = (pathSegments: string[] | string) =>
    pathSegments?.length === 2 &&
    pathSegments[0] === 'no' &&
    pathSegments[1] === 'person';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = context.req.headers.secret as string;
    const pathSegments = context?.params?.draftRouter;

    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    // Fetches data for the new frontpage for preview mode
    if (isFrontpage(pathSegments)) {
        return await fetchPageProps(['no', 'privatperson'], true, secret);
    }

    return await fetchPageProps(pathSegments, true, secret);
};

export default PageBase;
