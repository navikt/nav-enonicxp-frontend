import { makeErrorProps } from '../types/content-props/error-props';
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
    if (err?.content) {
        res.statusCode = err.content.data?.errorCode || res.statusCode;
        return err.content;
    }

    return makeErrorProps('/', 'Ukjent feil', res.statusCode);
};

export default Error;
