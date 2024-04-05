import React from 'react';
import { UserTestsConfigProps } from 'types/content-props/user-tests-config';
import { UserTests } from 'components/_common/user-tests/UserTests';
import { DocumentParameter } from 'components/_common/metatags/DocumentParameterMetatags';
import Head from 'next/head';

export const UserTestsConfigPreviewPage = (props: UserTestsConfigProps) => {
    return (
        <>
            <Head>
                <meta name={DocumentParameter.DecoratorDisabled} content={'true'} />
            </Head>
            <UserTests tests={props} selectedTestIds={[]} />
        </>
    );
};
