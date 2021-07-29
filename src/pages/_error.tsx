import { makeErrorProps } from '../utils/make-error-props';
import PageBase from '../components/PageBase';
import { ContentProps } from '../types/content-props/_content-common';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from '../utils/errors';

const Error = (props: ContentProps) => <PageBase content={props} />;

Error.getInitialProps = ({ res, err, asPath }): ContentProps => {
    if (err?.content) {
        res.statusCode = err.content.data?.errorCode || res.statusCode;
        return err.content;
    }

    const errorId = uuid();

    logPageLoadError(
        errorId,
        `Unhandled error on path ${asPath} - ${err.toString()}`
    );

    return makeErrorProps(asPath, undefined, res.statusCode, errorId);
};

export default Error;
