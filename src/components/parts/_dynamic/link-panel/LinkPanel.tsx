import React from 'react';
import { DynamicLinkPanel } from 'types/component-props/dynamic-parts/link-panel';
import { BEM } from 'utils/bem';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import './LinkPanel.less';

const bem = BEM('link-panel');

export const LinkPanel = ({ config }: DynamicLinkPanel) => {
    if (!config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const { title, ingress, background, icon, target, vertical } = config;

    const IconElement = icon?.mediaUrl && <img src={icon.mediaUrl} alt={''} />;

    return (
        <LenkepanelNavNo
            tittel={title}
            ikon={IconElement}
            vertikal={vertical}
            href={target?._path}
            className={bem()}
            style={{ backgroundImage: `url(${background?.mediaUrl})` }}
        >
            <>{ingress}</>
        </LenkepanelNavNo>
    );
};
