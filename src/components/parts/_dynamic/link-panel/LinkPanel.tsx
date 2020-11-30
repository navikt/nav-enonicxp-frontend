import React from 'react';
import { DynamicLinkPanel } from 'types/component-props/parts/link-panel';
import { BEM } from 'utils/bem';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import './LinkPanel.less';

const bem = BEM('link-panel');

export const LinkPanel = ({ config }: DynamicLinkPanel) => {
    if (!config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const { link, ingress, background, icon, vertical } = config;

    const linkProps = getSelectableLinkProps(link);

    const IconElement = icon?.mediaUrl && <img src={icon.mediaUrl} alt={''} />;

    return (
        <LenkepanelNavNo
            tittel={linkProps.text}
            ikon={IconElement}
            vertikal={vertical}
            href={linkProps.url}
            className={bem()}
            style={{ backgroundImage: `url(${background?.mediaUrl})` }}
        >
            <>{ingress}</>
        </LenkepanelNavNo>
    );
};
