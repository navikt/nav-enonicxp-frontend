import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { ProductPageFlexColsLayoutProps } from '../../../types/component-props/layouts/product-flex-cols';
import { Header } from '../../_common/headers/Header';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

type Props = {
    pageProps: ContentProps;
    layoutProps?: ProductPageFlexColsLayoutProps;
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
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {title && (
                <Header
                    level="2"
                    size="large"
                    justify={'left'}
                    hideCopyButton={!toggleCopyButton}
                    anchorId={anchorId}
                    className="custom-header-style"
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
