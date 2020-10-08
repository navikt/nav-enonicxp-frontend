import React from 'react';
import { LenkepanelProps } from '../_common/lenkepanel/LenkepanelPluss';
import { LenkepanelListe } from './lenkepanel-liste/LenkepanelListe';
import './MainPanels.less';

export const MainPanels = (props: LenkepanelProps) => {
    return <LenkepanelListe {...props} />;
};
