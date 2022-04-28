import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchPageProps } from '../../utils/fetch/fetch-page-props';
import { PageBase } from '../../components/PageBase';
import { routerQueryToXpPathOrId } from '../../utils/urls';

// TODO: validate datetime string
const getValidDateTime = (dateTime: string | string[]) => {
    return Array.isArray(dateTime) ? dateTime[0] : dateTime;
};

export const fetchVersionPageProps = async (
    context: GetServerSidePropsContext,
    isDraft = false
) => {
    const { time, id } = context.query;

    const xpPath = routerQueryToXpPathOrId(
        id || context?.params?.versionRouter
    );

    return fetchPageProps({
        routerQuery: xpPath,
        isDraft,
        noRedirect: true,
        versionTimestamp: getValidDateTime(time),
    });
};

const prodRouter = async (context) => {
    const secret = context.req.headers.secret as string;
    if (secret !== process.env.SERVICE_SECRET) {
        return {
            props: {},
            notFound: true,
        };
    }

    return fetchVersionPageProps(context);
};

const devRouter = async (context) => {
    return fetchVersionPageProps(context);
};

export const getServerSideProps: GetServerSideProps =
    process.env.ENV === 'prod' ? prodRouter : devRouter;

export default PageBase;
