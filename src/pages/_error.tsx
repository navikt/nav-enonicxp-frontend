import { makeErrorProps } from '../utils/make-error-props';
import PageBase from '../components/PageBase';
import { ContentProps } from '../types/content-props/_content-common';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from '../utils/errors';
import { paramDecodeErrorMsgExternal } from '../components/pages/error-page/errorcode-content/ErrorContent400';

const paramDecodeErrorMsg = 'failed to decode param';

const Error = (props: ContentProps) => <PageBase content={props} />;

Error.getInitialProps = ({ res, err, asPath }): ContentProps => {
    if (err?.content) {
        res.statusCode = err.content.data?.errorCode || res.statusCode;
        return err.content;
    }

    const errorId = uuid();
    const errorMsg = err?.toString() || 'Empty error message';

    logPageLoadError(
        errorId,
        `Unhandled error on path ${asPath} - ${errorMsg}`
    );

    if (errorMsg.includes(paramDecodeErrorMsg)) {
        return makeErrorProps(
            asPath,
            paramDecodeErrorMsgExternal,
            400,
            errorId
        );
    }

    return makeErrorProps(asPath, undefined, res.statusCode, errorId);
};

export default Error;
