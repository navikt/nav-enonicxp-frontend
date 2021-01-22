import { makeErrorProps } from '../utils/errors';
import PageBase from '../components/PageBase';
import { ContentProps } from '../types/content-props/_content-common';

const Error = (props: ContentProps) => <PageBase content={props} />;

Error.getInitialProps = ({
    res,
    err,
}: {
    res: any;
    err: { content: ContentProps };
}): ContentProps => {
    res.setHeader('X-Escape-5xx-Redirect', 'true');
    return (
        err?.content ||
        makeErrorProps('/', 'Ukjent feil', res?.statusCode || 500)
    );
};

export default Error;
