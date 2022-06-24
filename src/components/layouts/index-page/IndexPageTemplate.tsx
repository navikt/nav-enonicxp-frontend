import React from 'react';
import { IndexPageProps } from '../../../types/component-props/pages/index-page';
import { LayoutContainer } from '../LayoutContainer';
import style from './IndexPage.module.scss';
import Region from '../Region';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { ContentProps } from '../../../types/content-props/_content-common';

type Props = {
    pageProps: ContentProps;
};

export const IndexPageTemplate = ({ pageProps }: Props) => {
    const pageComponent = pageProps.page as IndexPageProps;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={pageComponent}
            className={style.indexPage}
        >
            <Region
                pageProps={pageProps}
                regionProps={pageComponent.regions.contentTop}
            />
            <EditorHelp
                text={
                    'Seksjon for område-navigasjon og header settes inn automatisk her'
                }
            />
            <Region
                pageProps={pageProps}
                regionProps={pageComponent.regions.contentBottom}
            />
        </LayoutContainer>
    );
};
