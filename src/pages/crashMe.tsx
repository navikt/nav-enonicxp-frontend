import { GetServerSideProps } from 'next';

const Crasherinos = ({ propserinos }: { propserinos: any }) => {
    const { undefinederinos } = propserinos;

    console.log(undefinederinos);

    return <div>{'Oh noes!'}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};

export default Crasherinos;
