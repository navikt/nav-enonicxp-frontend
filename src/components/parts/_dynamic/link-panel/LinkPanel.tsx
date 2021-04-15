import React from 'react';
import { DynamicLinkPanel } from 'types/component-props/parts/link-panel';
import { BEM, classNames } from 'utils/classnames';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { getImageUrl, XpImage } from '../../../_common/image/XpImage';
import './LinkPanel.less';

export const LinkPanel = ({ config }: DynamicLinkPanel) => {
    if (!config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const bem = BEM('link-panel');
    const { link, ingress, background, icon, vertical } = config;
    const linkProps = getSelectableLinkProps(link);

    const bgUrl = getImageUrl(background);

    return (
        <LenkepanelBase
            href={linkProps.url}
            border={true}
            className={classNames(bem(), vertical ? `vertical` : 'horisontal')}
            style={bgUrl && { backgroundImage: `url(${bgUrl})` }}
            linkCreator={(props) => (
                <LenkeBase
                    href={props.href}
                    analyticsLabel={linkProps.text}
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <div className={bem('innhold')}>
                <div className={bem('header')}>
                    {icon && (
                        <div className={bem('ikon')}>
                            <XpImage imageProps={icon} alt={''} />
                        </div>
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
