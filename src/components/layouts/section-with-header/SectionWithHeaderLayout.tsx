import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { Header } from '../../_common/header/Header';
import { TypoStyle } from '../../../types/typo-style';
import { XpImage } from '../../_common/image/XpImage';
import './SectionWithHeaderLayout.less';

const getBorderStyle = ({
    color = '#ffffff',
    width = 3,
    rounded,
}: SectionWithHeaderProps['config']['border']) => ({
    boxShadow: `0 0 0 ${width}px ${color} inset`,
    ...(rounded && { borderRadius: `${width * 3}px` }),
});

type Props = {
    pageProps: ContentProps;
    layoutProps: SectionWithHeaderProps;
};

export const SectionWithHeaderLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return null;
    }

    const { title, anchorId, icon, border, hideCopyButton } = config;

    const iconImgProps = icon?.icon;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            modifiers={icon && ['with-icon']}
        >
            {iconImgProps && (
                <div
                    className={'icon-container'}
                    style={{
                        ...(icon.color && { backgroundColor: icon.color }),
                    }}
                >
                    <XpImage
                        imageProps={iconImgProps}
                        alt={''}
                        style={{
                            ...(icon.size && {
                                height: `${icon.size}%`,
                                width: `${icon.size}%`,
                            }),
                        }}
                    />
                </div>
            )}
            <Header
                typoStyle={TypoStyle.Innholdstittel}
                tag={'h2'}
                justify={'left'}
                id={anchorId}
                hideCopyButton={hideCopyButton}
            >
                {title}
            </Header>
            <Region pageProps={pageProps} regionProps={regions.content} />
        </LayoutContainer>
    );
};
