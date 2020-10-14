import Panel from 'nav-frontend-paneler';
import React from 'react';
import './FilterPanel.less';

type Props = {
    className?: string;
    children: React.ReactNode | React.ReactNode[];
};

export const FilterPanel = ({ className, children }: Props) => {
    return (
        <Panel border={true} className={'search-filter-panel'}>
            {children}
        </Panel>
    );
};
