import React from 'react';
import { LinkPanelPartProps } from 'types/component-props/parts/link-panel';
import { Heading } from '@navikt/ds-react';
import { BEM, classNames } from 'utils/classnames';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { getImageUrl, XpImage } from '../../_common/image/XpImage';

const bem = BEM('link-panel');

export const LinkPanelPart = ({ config }: LinkPanelPartProps) => {
    if (!config) {
        return <h2>Tomt lenkepanel</h2>;
    }

    const { link, ingress, background, icon, variant } = config;

    const linkProps = getSelectableLinkProps(link);
    const bgUrl = getImageUrl(background);

    const selectedVariant = variant?._selected;
    const variantConfig = selectedVariant && variant[selectedVariant];
    const isVerticalLayout =
        selectedVariant === 'vertical' ||
        selectedVariant === 'verticalWithBgColor';
    const legacyAnalyticsComponentLabel = isVerticalLayout
        ? 'main-panels'
        : 'link-panel';

    return (
        <LenkepanelBase
            href={linkProps.url}
            border={true}
            className={classNames(
                bem(),
                isVerticalLayout ? `vertical` : 'horisontal'
            )}
            style={bgUrl && { backgroundImage: `url(${bgUrl})` }}
            linkCreator={(props) => (
                <LenkeBase
                    href={props.href}
                    analyticsLabel={linkProps.text}
                    component={legacyAnalyticsComponentLabel}
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <div className={bem('innhold')}>
                <div className={bem('header')}>
                    {icon && (
                        <div
                            className={classNames(
                                bem('icon'),
                                selectedVariant === 'verticalWithBgColor' &&
                                    bem('icon', 'bg')
                            )}
                            style={{
                                ...(selectedVariant ===
                                    'verticalWithBgColor' && {
                                    backgroundColor:
                                        variantConfig.iconBg?.color,
                                    alignItems: variantConfig.iconJustify,
                                }),
                            }}
                        >
                            <XpImage imageProps={icon} alt={''} />
                        </div>
                    )}
                    <Heading level="2" size="medium" className={bem('title')}>
                        {linkProps.text}
                    </Heading>
                </div>
                <div className={bem('ingress')}>{ingress}</div>
            </div>
        </LenkepanelBase>
    );
};
