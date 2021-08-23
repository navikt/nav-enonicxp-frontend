import { useRef } from 'react';
import { Title } from '@navikt/ds-react';

import classNames from 'classnames';
import { BEM } from '../../../utils/classnames';
import { logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';

import { useFilterState } from 'store/hooks/useFilteredContent';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useUpdateFlash } from 'utils/hooks/useUpdateFlash';

import { FilterCheckbox } from 'components/parts/filters-menu/FilterCheckbox';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { FilterExplanation } from './FilterExplanation';

import './FilterBar.less';

const bem = BEM('filter-bar');

type FilterBarProps = {
    layoutProps: SectionWithHeaderProps;
};

export const FilterBar = ({ layoutProps }: FilterBarProps) => {
    const { content, intro } = layoutProps.regions;
    const components = [...content.components, ...intro.components];
    const { language } = usePageConfig();
    const getLabel = translator('filteredContent', language);
    const { flashContentChange } = useUpdateFlash();

    const { selectedFilters, availableFilters, toggleFilter } =
        useFilterState();

    const filterBarRef = useRef(null);

    const onToggleFilterHandler = (filter) => {
        const filterBarElement = filterBarRef.current;
        const originalBarY: number = filterBarElement
            ? filterBarElement.getBoundingClientRect().top
            : 0;

        flashContentChange();

        logAmplitudeEvent('filtervalg', {
            kategori: filter.categoryName,
            filternavn: filter.filterName,
            opprinnelse: 'innholdtekst',
        });

        setTimeout(() => {
            toggleFilter(filter.id);
        }, 200);

        // It's possible in CS to cross link filters, resulting in content above a current FilterBar to
        // be hidden. This will result in a percieved scroll
        // for the user as the rest of the content will shift upwards and out of portview.
        // Offset this by calculating the bars position and scrolling back so that
        // content in the viewport will not seem to have moved at all.
        setTimeout(() => {
            if (filterBarElement) {
                const newBarY: number = filterBarElement
                    ? filterBarElement.getBoundingClientRect().top
                    : 0;

                const newScroll =
                    document.documentElement.scrollTop + newBarY - originalBarY;

                window.scrollTo({ top: newScroll });
            }
        }, 200);
    };

    // Create a flat array of all ids that any
    // underlying part that has filter ids attached.
    // We don't care about duplicate ids in the final array at the moment.
    const filterIds = components.reduce((acc, component) => {
        if (component.config.filters) {
            return [...acc, ...component.config.filters];
        }

        return acc;
    }, []);

    // None of the parts are attached to filters, so don't show the FilterBar.
    if (filterIds.length === 0) {
        return null;
    }

    // As the previous array is a string[], we need to create a list of the
    // actual filter objects to be able to display filterName later on.
    const filtersToDisplay = availableFilters
        .map((category) => {
            return category.filters
                .filter((filter) => filterIds.includes(filter.id))
                .map((filter) => ({
                    ...filter,
                    categoryName: category.categoryName, // Needed when reporting category back to Amplitude
                }));
        })
        .flat();

    return (
        <div className={bem('wrapper')} ref={filterBarRef}>
            <Title
                level={3}
                size="s"
                className={classNames(bem(), bem('header'))}
            >
                {getLabel('showingInformationFor')}
            </Title>
            <div className={bem('container')}>
                {filtersToDisplay.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                        <FilterCheckbox
                            key={filter.id}
                            isSelected={isSelected}
                            onToggleFilterHandler={() =>
                                onToggleFilterHandler(filter)
                            }
                            filter={filter}
                        />
                    );
                })}
            </div>
            <FilterExplanation
                selectedFilters={selectedFilters}
                availableFilters={filtersToDisplay.map((filter) => filter.id)}
            />
        </div>
    );
};
