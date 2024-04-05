import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { ProductPageFlexColsLayoutProps } from 'types/component-props/layouts/product-flex-cols';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import style from './FlexColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: ProductPageFlexColsLayoutProps;
};

export const ProductPageFlexColsLayout = ({
    pageProps,
    layoutProps,
}: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { title, anchorId, toggleCopyButton } = config;

    const calculateColCount = () => {
        return regionProps.components.length % 3 === 0 ? 3 : 2;
    };

    return (
        <LayoutContainer
            className={style.layoutSituationOrProduct}
            pageProps={pageProps}
            layoutProps={layoutProps}
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
                bemModifier={`${calculateColCount()}-cols`}
            />
            <EditorHelp
                text={
                    'Redaktørtips: Klikk "marker som klar" hvis kolonnene ikke vises riktig.'
                }
            />
        </LayoutContainer>
    );
};
