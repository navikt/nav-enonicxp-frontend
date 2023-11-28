import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { TestRecruiterPublicView } from 'components/_common/test-recruiter/TestRecruiterPublicView';
import { TestRecruiterEditorView } from 'components/_common/test-recruiter/TestRecruiterEditorView';

export type TestVariantProps = {
    id: string;
    percentage: number;
    url: string;
    linkText: string;
    title?: string;
    ingress?: string;
};

export type TestRecruiterProps = {
    tests: {
        data: {
            variants: TestVariantProps[];
            title: string;
            ingress: string;
            groupId: string;
            startTime: string;
            endTime: string;
        };
    };
    selectedTestIds: string[];
};

export const TestRecruiter = (props: TestRecruiterProps) => {
    const { pageConfig } = usePageConfig();

    return pageConfig.editorView ? (
        <TestRecruiterEditorView {...props} />
    ) : (
        <TestRecruiterPublicView {...props} />
    );
};
