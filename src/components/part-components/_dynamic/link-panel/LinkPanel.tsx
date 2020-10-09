import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import Link from 'next/link';
import { Undertittel } from 'nav-frontend-typografi';
import { isEnonicPath } from 'utils/paths';
import { DynamicLinkPanel } from 'types/content-types/_dynamic/link-panel';
import { BEM } from 'utils/bem';
import './LinkPanel.less';

const bem = BEM('link-panel');
export const LinkPanel = (props: DynamicLinkPanel) => {
    const no_nav_navno = props?.part?.config?.no_nav_navno;

    // Check if config is empty
    if (!no_nav_navno) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const { dynamic_link_panel } = props?.part?.config?.no_nav_navno;
    const { title, description, background } = dynamic_link_panel;
    const isInternalUrl = isEnonicPath('/');

    return (
        <LenkepanelBase
            href={'/'}
            className={`${bem()}`}
            style={{ backgroundImage: `url(${background.mediaUrl})` }}
            border={true}
            onClick={null}
            linkCreator={(props) =>
                isInternalUrl ? (
                    <Link href={props.href} passHref={true}>
                        <a {...props} />
                    </Link>
                ) : (
                    <a {...props} />
                )
            }
        >
            <div className={bem('innhold')}>
                <Undertittel className={bem('heading')}>{title}</Undertittel>
                {description && (
                    <div className={bem('ingress')}>{description}</div>
                )}
            </div>
        </LenkepanelBase>
    );
};
