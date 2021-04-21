import React from 'react';

type Props = {
    children: React.ReactNode;
};

export const Collapsable = ({ children }: Props) => {
    return <div>{children}</div>;
};
