import React from 'react';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { XpImage } from 'components/_common/image/XpImage';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { getMediaUrl } from 'utils/urls';
import { buildImageCacheUrl } from 'components/_common/image/NextImage';
import { usePageContentProps } from 'store/pageContext';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { XpImageProps } from 'types/media';
import { EmptyObject, OptionSetSingle } from 'types/util-types';
import { ColorMixin, LinkWithIngressMixin } from 'types/component-props/_mixins';

import style from './LenkepanelPart.module.scss';

export type PartConfigLenkepanel = {
    background?: XpImageProps; // Brukes potensielt ikke?
    icon?: XpImageProps;
    variant?: OptionSetSingle<{
        vertical: EmptyObject;
        verticalWithBgColor: {
            iconBg: ColorMixin;
            iconJustify: 'flex-start' | 'center' | 'flex-end';
        };
    }>;
} & LinkWithIngressMixin;

export const LenkepanelPart = ({ config }: PartComponentProps<PartType.Lenkepanel>) => {
    const { editorView, language } = usePageContentProps();

    if (!config) {
        return <EditorHelp text={'Tomt lenkepanel'} />;
    }

    const isEditorView = !!editorView;

    const { link, ingress, background, icon, variant } = config;

    const linkProps = getSelectableLinkProps(link);

    const bgUrl = background?.mediaUrl && getMediaUrl(background.mediaUrl, isEditorView, language);

    const selectedVariant = variant?._selected;
    const variantConfig = selectedVariant && variant[selectedVariant];

    const isVerticalLayout =
        selectedVariant === 'vertical' || selectedVariant === 'verticalWithBgColor';
    const legacyAnalyticsComponentLabel = isVerticalLayout ? 'main-panels' : 'link-panel';

    return (
        <LinkPanel
            href={linkProps.url}
            className={classNames(style.lenkepanel, isVerticalLayout ? `vertical` : 'horizontal')}
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
                                selectedVariant === 'verticalWithBgColor' && style.bg
                            )}
                            style={{
                                ...(selectedVariant === 'verticalWithBgColor' && {
                                    backgroundColor: variantConfig?.iconBg?.color,
                                    alignItems: variantConfig?.iconJustify,
                                }),
                            }}
                        >
                            <XpImage imageProps={icon} maxWidth={isVerticalLayout ? 384 : 64} />
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
