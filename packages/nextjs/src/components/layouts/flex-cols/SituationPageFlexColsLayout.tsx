import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { SituationPageFlexColsLayoutProps } from 'types/component-props/layouts/situation-flex-cols';
import { classNames } from 'utils/classnames';
import { Heading } from 'components/_common/headers/Heading';

import style from './FlexColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: SituationPageFlexColsLayoutProps;
};

export const SituationPageFlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { title, numCols, justifyContent, anchorId } = config;
    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };
    const calculateColCount = () => {
        return regionProps.components.length % 3 === 0 ? 3 : 2;
    };
    const isShelf =
        regionProps.components.some(
            (component) => component.descriptor === 'no.nav.navno:product-card'
        ) ||
        regionProps.components.some(
            (component) => component.descriptor === 'no.nav.navno:provider-card'
        );
    const colCount = numCols ?? calculateColCount();

    return (
        <LayoutContainer
            className={classNames(
                style.layoutSituationOrProduct,
                isShelf && style.layoutSituationShelf
            )}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <div className={style.contentWrapper}>
                {title && (
                    <Heading
                        level="2"
                        size="large"
                        anchorId={anchorId}
                        className={classNames(style.header, isShelf && style.shelfHeader)}
                    >
                        {title}
                    </Heading>
                )}
                <Region
                    pageProps={pageProps}
                    regionProps={regionProps}
                    regionStyle={regionStyle}
                    bemModifier={isShelf ? '' : `${colCount}-cols`}
                    className={isShelf ? style.shelfLayout : undefined}
                />
            </div>
        </LayoutContainer>
    );
};
