import React from 'react';
import {
    DaterangeBucketProps,
    DaterangeKey,
    DaterangeProps,
} from '../../../types/search/search-result';
import { RadioGruppe } from 'nav-frontend-skjema';
import { FilterSectionPanel } from './filter-section-panel/FilterSectionPanel';
import {
    FilterOption,
    FilterOptionType,
} from './filter-section-panel/FilterOption';
import { daterangeKeyToParam } from '../../../types/search/search-params';

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
    };

    return (
        <FilterSectionPanel>
            <RadioGruppe legend={'Tidsperiode'}>
                <FilterOption
                    {...buttonProps}
                    label={DaterangeKey.All}
                    count={allDocCount}
                    defaultChecked={allChecked}
                    onChange={() =>
                        setDaterange(daterangeKeyToParam[DaterangeKey.All])
                    }
                />
                {buckets.sort(sortBuckets).map((bucket) => (
                    <FilterOption
                        {...buttonProps}
                        label={bucket.key}
                        count={bucket.docCount}
                        defaultChecked={bucket.checked}
                        onChange={() =>
                            setDaterange(daterangeKeyToParam[bucket.key])
                        }
                        key={bucket.key}
                    />
                ))}
            </RadioGruppe>
        </FilterSectionPanel>
    );
};
