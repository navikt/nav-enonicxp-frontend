import React from 'react';
import { LinkPanelPartProps } from 'types/component-props/parts/link-panel';
import { Heading, Panel } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { XpImage } from '../../_common/image/XpImage';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { getMediaUrl } from 'utils/urls';
import { buildImageCacheUrl } from '../../_common/image/NextImage';
import { usePageContext } from 'store/pageContext';

import style from './LinkPanelPart.module.scss';

export const LinkPanelPart = ({ config }: LinkPanelPartProps) => {
    const { editorView } = usePageContext();

    if (!config) {
        return <EditorHelp text={'Tomt lenkepanel'} />;
    }

    const isEditorView = !!editorView;

    const { link, ingress, background, icon, variant } = config;

    const linkProps = getSelectableLinkProps(link);

    const bgUrl =
        background?.mediaUrl && getMediaUrl(background.mediaUrl, isEditorView);

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
                style.linkPanel,
                isVerticalLayout ? `vertical` : 'horizontal'
            )}
            border={true}
            style={
                bgUrl
                    ? {
                          backgroundImage: `url(${buildImageCacheUrl({
                              src: bgUrl,
                              isEditorView,
                              maxWidth: 480,
                              quality: 90,
                          })})`,
                      }
                    : undefined
            }
            as={(props) => (
                <LenkeBase
                    href={props.href}
                    analyticsLabel={linkProps.text}
                    analyticsComponent={legacyAnalyticsComponentLabel}
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <div className={style.innhold}>
                <div className={style.header}>
                    {icon && (
                        <div
                            aria-hidden={'true'}
                            className={classNames(
                                style.icon,
                                selectedVariant === 'verticalWithBgColor' &&
                                    style.bg
                            )}
                            style={{
                                ...(selectedVariant ===
                                    'verticalWithBgColor' && {
                                    backgroundColor:
                                        variantConfig?.iconBg?.color,
                                    alignItems: variantConfig?.iconJustify,
                                }),
                            }}
                        >
                            <XpImage
                                imageProps={icon}
                                alt={''}
                                maxWidth={isVerticalLayout ? 384 : 64}
                            />
                        </div>
                    )}
                    <Heading level="2" size="medium" className={style.title}>
                        {linkProps.text}
                    </Heading>
                </div>
                <div className={style.ingress}>{ingress}</div>
            </div>
        </Panel>
    );
};
