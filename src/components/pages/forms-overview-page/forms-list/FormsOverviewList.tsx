import React from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { BodyShort } from '@navikt/ds-react';
import { useOverviewFiltersState } from 'components/_common/overview-filters/useOverviewFiltersState';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

import style from './FormsOverviewList.module.scss';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
    } = props.data;

    const { language } = usePageConfig();

    const getTranslationString = translator('overview', language);

    const { matchFilters, hasDefaultFilters, dispatch, state } =
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
                contentList={formDetailsList}
                dispatch={dispatch}
                state={state}
                showTaxonomyFilter={taxonomyFilterToggle}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            <div className={style.filterSummary}>
                <BodyShort>
                    {numMatchingFilters > 0
                        ? `Viser ${numMatchingFilters} av ${formDetailsList.length}`
                        : getTranslationString('noProducts')}
                </BodyShort>
                {!hasDefaultFilters && (
                    <LenkeInline
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: 'resetFilters' });
                        }}
                    >
                        {getTranslationString('resetFilters')}
                    </LenkeInline>
                )}
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
