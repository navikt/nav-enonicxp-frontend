import React from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/panel/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { BodyShort } from '@navikt/ds-react';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { resetOverviewFiltersAction } from 'store/slices/overviewFilters';
import { Close } from '@navikt/ds-icons';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import style from './FormsOverviewList.module.scss';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
        overviewType,
    } = props.data;

    const { language } = usePageConfig();

    const getTranslationString = translator('overview', language);

    const { matchFilters, hasDefaultFilters, dispatch } =
        useOverviewFiltersState();

    const isVisible = (formDetail: FormDetailsListItemProps) =>
        matchFilters({
            text: formDetail.title,
            area: formDetail.area,
            taxonomy: formDetail.taxonomy,
        });

    const numMatchingFilters = formDetailsList.filter(isVisible).length;

    return (
        <div>
            <OverviewFilters
                filterableItems={formDetailsList}
                showTaxonomyFilter={taxonomyFilterToggle}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            <div className={style.filterSummary}>
                <BodyShort>
                    {numMatchingFilters > 0
                        ? getTranslationString('numHits')
                              .replace('$1', numMatchingFilters.toString())
                              .replace('$2', formDetailsList.length.toString())
                        : getTranslationString('noProducts')}
                </BodyShort>
                {!hasDefaultFilters && (
                    <LenkeBase
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(resetOverviewFiltersAction());
                        }}
                        className={style.reset}
                    >
                        <Close />
                        {getTranslationString('resetFilters')}
                    </LenkeBase>
                )}
            </div>
            {formDetailsList.map((formDetail) => (
                <FormsOverviewListPanel
                    formDetails={formDetail}
                    visible={isVisible(formDetail)}
                    overviewType={overviewType}
                    key={formDetail.anchorId}
                />
            ))}
        </div>
    );
};
