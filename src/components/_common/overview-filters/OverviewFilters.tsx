import React from 'react';
import { AreaFilter } from 'components/pages/overview-page/filter/area-filter/AreaFilter';
import { Area } from 'types/areas';
import { TaxonomyFilter } from 'components/pages/overview-page/filter/taxonomy-filter/TaxonomyFilter';
import { ProductTaxonomy } from 'types/taxonomies';
import { OverviewSearch } from 'components/pages/overview-page/overview-search/OverviewSearch';
import { ContentType } from 'types/content-props/_content-common';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './OverviewFilters.module.scss';

type ContentItem = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    type?: ContentType;
};

type Props = {
    contentList: ContentItem[];
    showTextInputFilter: boolean;
    showTaxonomyFilter: boolean;
    showAreaFilter: boolean;
};

export const OverviewFilters = ({
    contentList,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
}: Props) => {
    const { language } = usePageConfig();
    const getTranslationString = translator('overview', language);

    return (
        <div className={style.filters}>
            {showAreaFilter && <AreaFilter contentList={contentList} />}
            {showTaxonomyFilter && <TaxonomyFilter contentList={contentList} />}
            {showTextInputFilter && (
                <OverviewSearch label={getTranslationString('search')} />
            )}
        </div>
    );
};
