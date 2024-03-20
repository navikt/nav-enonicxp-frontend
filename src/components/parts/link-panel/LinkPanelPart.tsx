import React from 'react';
import { LinkPanelPartProps } from 'types/component-props/parts/link-panel';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { XpImage } from 'components/_common/image/XpImage';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { getMediaUrl } from 'utils/urls';
import { buildImageCacheUrl } from 'components/_common/image/NextImage';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './LinkPanelPart.module.scss';

export const LinkPanelPart = ({ config }: LinkPanelPartProps) => {
    const { pageConfig } = usePageConfig();

    if (!config) {
        return <EditorHelp text={'Tomt lenkepanel'} />;
    }

    const isEditorView = !!pageConfig.editorView;

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
        <LinkPanel
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
            analyticsLabel={linkProps.text}
            analyticsComponent={legacyAnalyticsComponentLabel}
            as={LenkeBase}
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
        </LinkPanel>
    );
};
