import React from 'react';
import LenkepanelPluss, {
    LenkepanelProps,
} from '../lenkepanel/LenkepanelPluss';
import './LenkepanelVertical.less';

export const LenkepanelVertical = (props: LenkepanelProps) => {
    return (
        <LenkepanelPluss
            {...props}
            separator={true}
            className={`lenkepanel-vertical ${props.className || ''}`}
        />
    );
};
