import React, { useState } from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import style from './FormsOverviewList.module.scss';
import { useOverviewFilters } from 'components/_common/overview-filters/filter-context/useOverviewFilters';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const { formDetailsList, showFilter } = props.data;

    const { resetFilters, isMatchingFilters } = useOverviewFilters();

    const isVisible = (formDetail: FormDetailsListItemProps) =>
        isMatchingFilters({
            text: formDetail.title,
            area: formDetail.area,
            taxonomy: formDetail.taxonomy,
        });

    const numMatchingFilters = formDetailsList.filter(isVisible).length;

    return (
        <div>
            <OverviewFilters
                contentList={formDetailsList}
                showAreaFilter={true}
                showTaxonomyFilter={true}
                showTextInputFilter={showFilter}
            />
            <div className={style.filterSummary}>
                <BodyShort>
                    {`Viser ${numMatchingFilters} av ${formDetailsList.length}`}
                </BodyShort>
                <LenkeBase
                    href={'#'}
                    onClick={(e) => {
                        e.preventDefault();
                        resetFilters();
                    }}
                >
                    {'Nullstill'}
                </LenkeBase>
            </div>
            {formDetailsList.map((formDetail) => (
                <FormsOverviewListPanel
                    formDetails={formDetail}
                    visible={isVisible(formDetail)}
                    key={formDetail.anchorId}
                />
            ))}
        </div>
    );
};
