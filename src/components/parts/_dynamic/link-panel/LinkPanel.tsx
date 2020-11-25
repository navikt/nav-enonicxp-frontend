import React from 'react';
import { DynamicLinkPanel } from 'types/component-props/dynamic-parts/link-panel';
import { BEM } from 'utils/bem';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import './LinkPanel.less';

const bem = BEM('link-panel');

export const LinkPanel = (props: DynamicLinkPanel) => {
    if (!props.config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const { title, ingress, background, icon, target } = props.config;

    return (
        <LenkepanelNavNo
            tittel={title}
            href={target?._path}
            className={bem()}
            style={{ backgroundImage: `url(${background?.mediaUrl})` }}
        >
            <>{ingress}</>
        </LenkepanelNavNo>
    );
};
