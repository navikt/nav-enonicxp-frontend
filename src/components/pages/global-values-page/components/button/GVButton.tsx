import React from 'react';
import KnappBase from 'nav-frontend-knapper';

export const GVButton = (props: React.ComponentProps<typeof KnappBase>) => (
    <KnappBase mini={true} kompakt={true} {...props}>
        {props.children}
    </KnappBase>
);
