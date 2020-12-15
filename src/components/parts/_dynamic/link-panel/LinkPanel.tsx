import React from 'react';
import { DynamicLinkPanel } from 'types/component-props/parts/link-panel';
import { BEM } from 'utils/bem';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { LenkeUstylet } from '../../../_common/lenke/LenkeUstylet';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import './LinkPanel.less';

export const LinkPanel = ({ config }: DynamicLinkPanel) => {
    if (!config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const bem = BEM('link-panel');
    const { link, ingress, background, icon, vertical } = config;
    const linkProps = getSelectableLinkProps(link);
    const IconElement = icon?.mediaUrl && <img src={icon.mediaUrl} alt={''} />;

    return (
        <LenkepanelBase
            href={linkProps.url}
            border={true}
            className={`${bem()} ${vertical ? `vertical` : 'horisontal'}`}
            style={
                background?.mediaUrl && {
                    backgroundImage: `url(${background.mediaUrl})`,
                }
            }
            linkCreator={(props) => (
                <LenkeUstylet href={props.href} {...props}>
                    {props.children}
                </LenkeUstylet>
            )}
        >
            <div className={bem('innhold')}>
                <div className={bem('header')}>
                    {IconElement && (
                        <div className={bem('ikon')}>{IconElement}</div>
                    )}
                    <Undertittel className={bem('title')}>
                        {linkProps.text}
                    </Undertittel>
                </div>
                <div className={bem('ingress')}>{ingress}</div>
            </div>
        </LenkepanelBase>
    );
};
