import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextApiRequest,
} from 'next';
import bodyParser from 'body-parser';
import util from 'util';
import { GlobalValuesPage } from '../../components/_editor/global-values-page/GlobalValuesPage';

const parseReqBody = util.promisify(bodyParser.json({ limit: '10MB' }));

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
}: GetServerSidePropsContext & { req: NextApiRequest }) => {
    const secret = req.headers.secret;
    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    await parseReqBody(req, res);

    return { props: req.body };
};

export default GlobalValuesPage;
