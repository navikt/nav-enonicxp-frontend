import React from 'react';
import { Button } from '../../../../_common/button/Button';

export const GVButton = (props: React.ComponentProps<typeof Button>) => (
    <Button {...props} size={'small'}>
        {props.children}
    </Button>
);
