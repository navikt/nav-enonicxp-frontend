import { ErrorProps } from '../types/content-props/error-props';
import { makeErrorProps } from '../utils/errors';
import PageBase from '../components/PageBase';

const Error = (errorProps: ErrorProps) => {
    console.log('error! oh noes');
    return <PageBase content={errorProps} />;
};

Error.getInitialProps = ({
    res,
    err,
}: {
    res: any;
    err: { content: ErrorProps };
}): ErrorProps => {
    console.log(`error gip:`, err);
    return (
        err?.content ||
        makeErrorProps('/', 'Ukjent feil', res?.statusCode || 500)
    );
};

export default Error;
