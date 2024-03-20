import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { SituationPageFlexColsLayoutProps } from '../../../types/component-props/layouts/situation-flex-cols';
import { Header } from '../../_common/headers/Header';

import style from './FlexColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps?: SituationPageFlexColsLayoutProps;
};

export const SituationPageFlexColsLayout = ({
    pageProps,
    layoutProps,
}: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const {
        title,
        numCols,
        justifyContent,
        anchorId,
        toggleCopyButton,
        shelf,
    } = config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    const calculateColCount = () => {
        return regionProps.components.length % 3 === 0 ? 3 : 2;
    };

    const colCount =
        typeof numCols === 'number' ? numCols : calculateColCount();

    const buildModifiers = () => {
        if (!shelf?._selected) {
            return [];
        }

        return [shelf._selected];
    };

    return (
        <LayoutContainer
            className={style.layoutSituationOrProduct}
            pageProps={pageProps}
            layoutProps={layoutProps}
            modifiers={buildModifiers()}
        >
            {title && (
                <Header
                    level="2"
                    size="large"
                    justify={'left'}
                    hideCopyButton={!toggleCopyButton}
                    anchorId={anchorId}
                    className={style.header}
                >
                    {title}
                </Header>
            )}
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                regionStyle={regionStyle}
                bemModifier={`${colCount}-cols`}
            />
        </LayoutContainer>
    );
};
