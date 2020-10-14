import React from 'react';
import {
    DaterangeBucketProps,
    DaterangeKey,
    DaterangeProps,
} from '../../../types/search/search-result';
import { RadioGruppe } from 'nav-frontend-skjema';
import { FilterPanel } from './filter-panel/FilterPanel';
import { FilterOption, FilterOptionType } from './filter-panel/FilterOption';

type Props = {
    daterangeProps: DaterangeProps;
    setDaterange: (key: number) => void;
};

const bucketsDisplayOrder = [
    DaterangeKey.Last7Days,
    DaterangeKey.Last30Days,
    DaterangeKey.Last12Months,
    DaterangeKey.Over12Months,
];

const sortBuckets = (a: DaterangeBucketProps, b: DaterangeBucketProps) =>
    bucketsDisplayOrder.indexOf(a.key) - bucketsDisplayOrder.indexOf(b.key);

export const DaterangeSelector = ({ daterangeProps, setDaterange }: Props) => {
    const {
        docCount: allDocCount,
        checked: allChecked,
        buckets,
    } = daterangeProps;

    const buttonProps = {
        name: 'timerange',
        type: 'radio' as FilterOptionType,
        onChange: setDaterange,
    };

    return (
        <FilterPanel>
            <RadioGruppe legend={'Tidsperiode'}>
                <FilterOption
                    {...buttonProps}
                    label={DaterangeKey.All}
                    count={allDocCount}
                    defaultChecked={allChecked}
                />
                {buckets.sort(sortBuckets).map((bucket) => (
                    <FilterOption
                        {...buttonProps}
                        label={bucket.key}
                        count={bucket.docCount}
                        defaultChecked={bucket.checked}
                        key={bucket.key}
                    />
                ))}
            </RadioGruppe>
        </FilterPanel>
    );
};
