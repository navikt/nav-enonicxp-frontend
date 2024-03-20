import React, { useEffect, useRef, useState } from 'react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { OverviewTaxonomyFilter } from 'components/_common/overview-filters/taxonomy-filter/OverviewTaxonomyFilter';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import {
    OverviewFilterableItem,
    useOverviewFilters,
} from 'store/hooks/useOverviewFilters';
import { classNames } from 'utils/classnames';
import { FunnelIcon } from '@navikt/aksel-icons';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { Heading, Button } from '@navikt/ds-react';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

import style from './OverviewFilters.module.scss';

const MobileView = ({
    filterableItems,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
}: Props) => {
    const { language } = usePageContentProps();

    const [isOpen, setIsOpen] = useState(false);
    const filtersRef = useRef();

    const hasToggleFilters = showAreaFilter || showTaxonomyFilter;

    const searchLabel = translator(
        'overview',
        language
    )(hasToggleFilters ? 'filterOrSearch' : 'search');

    return (
        <div className={style.mobile}>
            {showTextInputFilter && (
                <>
                    <Heading level={'2'} size={'xsmall'}>
                        {searchLabel}
                    </Heading>
                    <div
                        className={classNames(
                            style.mobileFilters,
                            hasToggleFilters && style.withToggleFilters
                        )}
                    >
                        {hasToggleFilters && (
                            <Button
                                icon={<FunnelIcon aria-hidden={true} />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(!isOpen);
                                    logAmplitudeEvent(AnalyticsEvents.FILTER, {
                                        opprinnelse:
                                            'oversiktsside filter mobil',
                                    });
                                }}
                                className={style.mobileFilterButton}
                                variant="primary-neutral"
                            >
                                {'Filter'}
                            </Button>
                        )}
                        <OverviewTextFilter hideLabel={true} />
                    </div>
                </>
            )}
            {hasToggleFilters && (
                <div
                    className={classNames(
                        style.mobileToggleFilters,
                        (isOpen || !showTextInputFilter) && style.open
                    )}
                    ref={filtersRef}
                >
                    {showAreaFilter && (
                        <OverviewAreaFilter items={filterableItems} />
                    )}
                    {showTaxonomyFilter && (
                        <OverviewTaxonomyFilter items={filterableItems} />
                    )}
                </div>
            )}
        </div>
    );
};

const DesktopView = ({
    filterableItems,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
}: Props) => {
    const { language } = usePageContentProps();
    const searchLabel = translator('overview', language)('filterOrSearch');
    return (
        <div className={style.desktop}>
            <Heading className="sr-only" level={'2'} size={'xsmall'}>
                {searchLabel}
            </Heading>
            {showAreaFilter && <OverviewAreaFilter items={filterableItems} />}
            {showTaxonomyFilter && (
                <OverviewTaxonomyFilter items={filterableItems} />
            )}
            {showTextInputFilter && <OverviewTextFilter hideLabel={false} />}
        </div>
    );
};

type Props = {
    filterableItems: OverviewFilterableItem[];
    showTextInputFilter: boolean;
    showTaxonomyFilter: boolean;
    showAreaFilter: boolean;
};

export const OverviewFilters = (props: Props) => {
    const { showTextInputFilter, showAreaFilter, showTaxonomyFilter } = props;
    const { resetFilters } = useOverviewFilters();

    useEffect(() => {
        // Reset filters when the component dismounts
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    if (!showAreaFilter && !showTaxonomyFilter && !showTextInputFilter) {
        return null;
    }

    return (
        <>
            <DesktopView {...props} />
            <MobileView {...props} />
        </>
    );
};
