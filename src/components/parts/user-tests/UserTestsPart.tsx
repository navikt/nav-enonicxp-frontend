import React from 'react';
import { UserTestsPartProps } from '../../../types/component-props/part-configs/user-tests';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UserTests } from 'components/_common/user-tests/UserTests';

export const UserTestsPart = ({ config }: UserTestsPartProps) => {
    if (!config?.tests?.data) {
        return <EditorHelp text={'Velg en test-gruppering'} type={'error'} />;
    }

    return (
        <UserTests
            tests={config.tests}
            selectedTestIds={config.selectedTestIds}
        />
    );
};
