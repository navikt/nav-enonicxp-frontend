import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import './RadioExpandingPanel.less';

type Props = {
    title: React.ReactNode;
    isOpen: boolean;
    onClick: (args: any) => any;
    children: React.ReactNode | React.ReactNode[];
};

export const RadioExpandingPanel = ({
    title,
    isOpen,
    onClick,
    children,
}: Props) => {
    return (
        <EkspanderbartpanelBase
            tittel={title}
            apen={isOpen}
            onClick={onClick}
            border={false}
            className={'radio-expanding-panel'}
        >
            {children}
        </EkspanderbartpanelBase>
    );
};
