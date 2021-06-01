import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageHeader } from '../../../_common/header/PageHeader';
import './ProductPageHeader.less';
import { ContentType } from '../../../../types/content-props/_content-common';

const bem = BEM('product-page-header');

type Props = {
    pageType?: ContentType.ProductPage | ContentType.OverviewPage;
    children: string;
};

export const ProductPageHeader = ({ pageType, children }: Props) => {
    return (
        <div
            className={classNames(
                bem(),
                pageType === ContentType.ProductPage &&
                    bem(undefined, 'product'),
                pageType === ContentType.OverviewPage &&
                    bem(undefined, 'situation')
            )}
        >
            <PageHeader justify={'left'}>{children}</PageHeader>
        </div>
    );
};
