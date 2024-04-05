import React from 'react';
import Head from 'next/head';
import { UserTestsConfigProps } from 'types/content-props/user-tests-config';
import { UserTests } from 'components/_common/user-tests/UserTests';
import { DocumentParameter } from 'components/_common/metatags/DocumentParameterMetatags';

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
