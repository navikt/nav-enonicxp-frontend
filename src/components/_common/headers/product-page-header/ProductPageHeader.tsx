import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { ContentType } from '../../../../types/content-props/_content-common';
import { Undertekst } from 'nav-frontend-typografi';
import { PublicImage } from '../../image/PublicImage';
import { translator } from 'translations';
import './ProductPageHeader.less';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Taxonomies } from 'types/taxonomies';
import { Illustration } from 'components/_common/illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';

const bem = BEM('product-page-header');

type Props = {
    pageType: ContentType.ContentPageWithSidemenus | ContentType.SituationPage;
    taxonomy?: Taxonomies;
    illustration?: any;
    children: string;
};

export const ProductPageHeader = ({
    pageType,
    illustration,
    children,
    taxonomy,
}: Props) => {
    const { language } = usePageConfig();
    const getTaxonomyLabel = translator('situations', language);
    const taxonomyTitle = getTaxonomyLabel('youMayHaveRightTo');

    return (
        <div
            className={classNames(
                bem(),
                pageType === ContentType.ContentPageWithSidemenus &&
                    bem(undefined, 'product'),
                pageType === ContentType.SituationPage &&
                    bem(undefined, 'situation')
            )}
        >
            <Illustration
                illustration={illustration}
                placement={IllustrationPlacements.PRODUCT_PAGE_HEADER}
            />
            <div className={bem('text')}>
                <PageHeader justify={'left'}>{children}</PageHeader>
                {taxonomyTitle && (
                    <Undertekst className={bem('label')}>
                        {taxonomyTitle.toUpperCase()}
                    </Undertekst>
                )}
            </div>
        </div>
    );
};
