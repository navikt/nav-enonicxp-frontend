import Panel from 'nav-frontend-paneler';
import React from 'react';
import './FilterSectionPanel.less';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

export const FilterSectionPanel = ({ children }: Props) => {
    return (
        <Panel border={true} className={'search-filter-panel'}>
            {children}
        </Panel>
    );
};
