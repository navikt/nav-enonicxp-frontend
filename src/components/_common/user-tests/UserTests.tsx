import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { UserTestsEditorView } from 'components/_common/user-tests/editor-view/UserTestsEditorView';
import { UserTestsPublicView } from 'components/_common/user-tests/public-view/UserTestsPublicView';

import style from './UserTests.module.scss';

export type UserTestVariantProps = {
    id: string;
    url: string;
    linkText: string;
    percentage: number;
    title?: string;
    ingress?: string;
};

export type UserTestsData = {
    title: string;
    ingress: string;
    cookieId: string;
    startTime?: string;
    endTime?: string;
    variants: UserTestVariantProps[];
};

export type UserTestsProps = {
    tests: {
        data: UserTestsData;
    };
    selectedTestIds: string[];
};

export const UserTests = (props: UserTestsProps) => {
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
