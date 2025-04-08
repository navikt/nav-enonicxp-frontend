import React from 'react';
import { usePageContentProps } from 'store/pageContext';
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
    const { editorView } = usePageContentProps();

    return (
        <section className={style.wrapper}>
            {editorView ? <UserTestsEditorView {...props} /> : <UserTestsPublicView {...props} />}
        </section>
    );
};
