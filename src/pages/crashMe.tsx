import { GetServerSideProps } from 'next';

const CrashMe = (props) => {
    const { bar } = props.foo;

    return <div>{'By fire be purged!'}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: {} };
};

export default CrashMe;
