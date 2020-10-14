import React from 'react';
import {
    DaterangeBucketProps,
    DaterangeKey,
    DaterangeProps,
} from '../../types/search/search-result';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { daterangeKeyToParam } from '../../types/search/search-params';
import { Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

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

const Timerange = ({
    daterangeKey,
    docCount,
    checked,
    setDateRange,
}: {
    daterangeKey: string;
    docCount: number;
    checked: boolean;
    setDateRange: Props['setDaterange'];
}) => {
    return (
        <div className={'search__filter-option'}>
            <Radio
                label={daterangeKey}
                name={'timerange'}
                defaultChecked={checked}
                onChange={() => setDateRange(daterangeKeyToParam[daterangeKey])}
            />
            <Undertekst className={'search__filter-option-count'}>
                {docCount}
            </Undertekst>
        </div>
    );
};

export const DaterangeSelection = ({ daterangeProps, setDaterange }: Props) => {
    const {
        docCount: allDocCount,
        checked: allChecked,
        buckets,
    } = daterangeProps;

    return (
        <Panel border={true} className={'search__filter'}>
            <RadioGruppe legend={'Tidsperiode'}>
                <Timerange
                    daterangeKey={DaterangeKey.All}
                    docCount={allDocCount}
                    checked={allChecked}
                    setDateRange={setDaterange}
                />
                {buckets.sort(sortBuckets).map((bucket) => (
                    <Timerange
                        daterangeKey={bucket.key}
                        docCount={bucket.docCount}
                        checked={bucket.checked}
                        setDateRange={setDaterange}
                        key={bucket.key}
                    />
                ))}
            </RadioGruppe>
        </Panel>
    );
};
