import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { UserTestsEditorView } from 'components/_common/user-tests/editor-view/UserTestsEditorView';
import { UserTestsPublicView } from 'components/_common/user-tests/public-view/UserTestsPublicView';
import { UserTestsConfigData } from 'types/content-props/user-tests-config';

import style from './UserTests.module.scss';

export type UserTestsComponentProps = {
    tests: {
        data: UserTestsConfigData;
    };
    selectedTestIds: string[];
};

export const UserTests = (props: UserTestsComponentProps) => {
    const { pageConfig } = usePageConfig();

    return (
        <div className={style.wrapper}>
            {pageConfig.editorView ? (
                <UserTestsEditorView {...props} />
            ) : (
                <UserTestsPublicView {...props} />
            )}
        </div>
    );
};
