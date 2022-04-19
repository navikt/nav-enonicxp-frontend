import React from 'react';
import { Button } from '../../../../_common/button/Button';
import { EditorLinkWrapper } from '../../../../_editor-only/editor-link-wrapper/EditorLinkWrapper';

export const GVButton = (props: React.ComponentProps<typeof Button>) => (
    <EditorLinkWrapper>
        <Button {...props} size={'small'}>
            {props.children}
        </Button>
    </EditorLinkWrapper>
);
