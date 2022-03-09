import React from 'react';
import { LinkPanelPartProps } from 'types/component-props/parts/link-panel';
import { Heading, Panel } from '@navikt/ds-react';
import { BEM, classNames } from 'utils/classnames';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { getImageUrl, XpImage } from '../../_common/image/XpImage';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

const bem = BEM('link-panel');

export const LinkPanelPart = ({ config }: LinkPanelPartProps) => {
    if (!config) {
        return <EditorHelp text={'Tomt lenkepanel'} />;
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
        <Panel
            href={linkProps.url}
            className={classNames(
                bem(),
                isVerticalLayout ? `vertical` : 'horizontal'
            )}
            border={true}
            style={bgUrl && { backgroundImage: `url(${bgUrl})` }}
            as={(props) => (
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
                            aria-hidden={'true'}
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
        </Panel>
    );
};
