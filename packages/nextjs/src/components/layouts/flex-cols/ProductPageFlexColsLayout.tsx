import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { ProductPageFlexColsLayoutProps } from 'types/component-props/layouts/product-flex-cols';
import { Heading } from 'components/_common/headers/Heading';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

import style from './FlexColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: ProductPageFlexColsLayoutProps;
};

export const ProductPageFlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { title, anchorId } = config;

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
                <Heading level="2" size="large" anchorId={anchorId} className={style.header}>
                    {title}
                </Heading>
            )}
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                bemModifier={`${calculateColCount()}-cols`}
            />
            <EditorHelp
                text={'Redaktørtips: Klikk "marker som klar" hvis kolonnene ikke vises riktig.'}
            />
        </LayoutContainer>
    );
};
