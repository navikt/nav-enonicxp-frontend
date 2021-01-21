import React from 'react';
import { GetServerSideProps } from 'next';

const ErrorTest = (props: any) => {
    const { something } = props.notDefinedAndWillCrash;

    return <div>{something}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};

export default ErrorTest;
