import React from 'react';
import { TestRecruiterPartProps } from 'types/component-props/parts/test-recruiter';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { TestRecruiter } from 'components/_common/test-recruiter/TestRecruiter';

export const TestRecruiterPart = ({ config }: TestRecruiterPartProps) => {
    if (!config?.tests?.data) {
        return <EditorHelp text={'Velg en test-gruppering'} type={'error'} />;
    }

    return (
        <TestRecruiter
            tests={config.tests}
            selectedTestIds={config.selectedTestIds}
        />
    );
};
