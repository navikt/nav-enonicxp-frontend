import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import Region from '../../Region';
import { RegionProps } from '../../../../types/component-props/layouts';
import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';
import { PageNavigationMenu } from '../../../_common/page-navigation-menu/PageNavigationMenu';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import { EditorHelp } from '../../../_editor-only/editor-help/EditorHelp';
import { RelatedSituations } from 'components/_common/relatedSituations/RelatedSituations';

const bem = BEM('left-menu');

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    sticky?: boolean;
    topRegionProps: RegionProps;
    mainRegionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftMenuSection = ({
    internalLinks,
    menuHeader,
    sticky,
    topRegionProps,
    mainRegionProps,
    pageProps,
}: Props) => {
    const relatedSituations =
        pageProps.type === ContentType.ProductPage
            ? pageProps.data.relatedSituations
            : undefined;

    return (
        <div className={classNames(bem(), sticky && bem(undefined, 'sticky'))}>
            <PageNavigationMenu
                title={menuHeader}
                anchorLinks={internalLinks}
                viewStyle={'sidebar'}
            />
            <Region pageProps={pageProps} regionProps={topRegionProps} />
            <EditorHelp
                text={
                    'Komponenter ovenfor legges inn rett under innholdsmenyen'
                }
            />
            <Region pageProps={pageProps} regionProps={mainRegionProps} />
            {relatedSituations && (
                <RelatedSituations relevantSituations={relatedSituations} />
            )}
        </div>
    );
};
