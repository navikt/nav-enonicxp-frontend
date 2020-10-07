import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import Link from 'next/link';
import { Undertittel } from 'nav-frontend-typografi';
import { isEnonicPath } from '../../../../utils/paths';
import { DynamicLinkPanelWithBackground } from '../../../../types/dynamic-components/link-panel-with-background';
import { BEM } from '../../../../utils/bem';
import './LinkPanelWithBackground.less';

type Props = DynamicLinkPanelWithBackground;
export const LinkPanelWithBackground = (props: Props) => {
    const { link_panel_with_background } = props.part.config.no_nav_navno;
    const { title, description, background } = link_panel_with_background;
    const bem = BEM('link-panel-with-background');
    const isInternalUrl = isEnonicPath('/');
    const backgroundUrl = `${process.env.XP_ORIGIN}/_/image/${background._id}/block-800-800/${background.data.media.attachment}`;

    return (
        <LenkepanelBase
            href={'/'}
            className={`${bem()}`}
            style={{
                backgroundImage: `url(${backgroundUrl})`,
            }}
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
                <hr className={bem('separator')} />
                {description && (
                    <div className={bem('ingress')}>{description}</div>
                )}
            </div>
        </LenkepanelBase>
    );
};
