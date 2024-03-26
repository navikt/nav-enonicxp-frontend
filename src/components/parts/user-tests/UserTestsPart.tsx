import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UserTests } from 'components/_common/user-tests/UserTests';
import { PartComponent, PartType } from 'types/component-props/parts';

export const UserTestsPart: PartComponent<PartType.UserTests> = ({
    config,
}) => {
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
