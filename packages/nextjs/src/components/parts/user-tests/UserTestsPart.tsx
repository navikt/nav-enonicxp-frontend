import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { UserTests, UserTestsComponentProps } from 'components/_common/user-tests/UserTests';
import { PartComponentProps, PartType } from 'types/component-props/parts';

export type PartConfigUserTests = UserTestsComponentProps;

export const UserTestsPart = ({ config }: PartComponentProps<PartType.UserTests>) => {
    if (!config?.tests?.data) {
        return <EditorHelp text={'Velg en test-gruppering'} type={'error'} />;
    }

    return <UserTests tests={config.tests} selectedTestIds={config.selectedTestIds} />;
};
