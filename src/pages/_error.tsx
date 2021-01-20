import { ErrorPage } from '../components/pages/error-page/ErrorPage';
import { ErrorProps, makeErrorProps } from '../types/content-props/error-props';

const Error = (props: ErrorProps) => <ErrorPage {...props} />;

Error.getInitialProps = ({
    res,
    err,
}: {
    res: any;
    err: { errorProps: ErrorProps };
}): ErrorProps =>
    err?.errorProps ||
    makeErrorProps('/', 'Ukjent feil', res?.statusCode || 500);

export default Error;
