import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { SituationPageProps } from '../../../types/content-props/dynamic-page-props';
import { ProductPageHeader } from '../../_common/headers/product-page-header/ProductPageHeader';
import { BEM, classNames } from '../../../utils/classnames';
import './SituationPage.less';

const bem = BEM('situation-page');

export const SituationPage = (props: SituationPageProps) => {
    const { data, __typename: type } = props;

    const { taxonomy } = data;

    const title = data.title || props.displayName;

    return (
        <div className={classNames(bem(), bem(undefined, 'situation'))}>
            <ProductPageHeader pageType={type} taxonomy={taxonomy}>
                {title}
            </ProductPageHeader>
            <div className={bem('content')}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
