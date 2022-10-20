import { makeErrorProps } from '../utils/make-error-props';
import { PageBase } from '../components/PageBase';
import { ContentProps } from '../types/content-props/_content-common';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from '../utils/errors';
import { fetchWithTimeout } from '../utils/fetch/fetch-utils';

const fetchFailoverHtml = async (path: string) => {
    const url = `${process.env.FAILOVER_ORIGIN}${path}`;
    console.log(`Fetching failover html from ${url}`);

    return fetchWithTimeout(url, 15000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.text();
            }

            console.error(`Error response from failover: ${res.status}`);
            return null;
        })
        .catch((e) => {
            console.error(`Exception from failover fetch: ${e}`);
            return null;
        });
};

const Error = (props: ContentProps) => <PageBase content={props} />;

Error.getInitialProps = async (context): Promise<ContentProps> => {
    const { res, err, asPath } = context;

    if (!res) {
        return err?.content || makeErrorProps();
    }

    if (process.env.IS_FAILOVER_INSTANCE !== 'true') {
        console.log(`Fetching failover html for ${asPath}`);
        const failoverHtml = await fetchFailoverHtml(asPath);

        if (typeof failoverHtml === 'string') {
            res.status(200).send(failoverHtml);
            return;
        } else {
            console.error(`Failover html is not text!`);
        }
    }

    res.statusCode = err?.content?.data?.errorCode || res.statusCode;

    const errorId = uuid();
    const errorMsg = err?.toString() || 'Empty error message';

    logPageLoadError(
        errorId,
        `Unhandled error on path ${asPath} - ${errorMsg}`
    );

    return makeErrorProps(asPath, errorMsg, res.statusCode, errorId);
};

export default Error;
