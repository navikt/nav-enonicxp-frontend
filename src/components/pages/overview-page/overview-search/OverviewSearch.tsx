import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

import style from './OverviewSearch.module.scss';

const analytics = debounce(
    (value: string) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            tekst: value,
            opprinnelse: 'oversiktsside fritekst',
        });
    },
    250,
    { maxWait: 1000 }
);

type OverviewSearchProps = {
    searchUpdateCallback: (string) => void;
    label: string;
};

export const OverviewSearch = ({
    searchUpdateCallback,
    label,
}: OverviewSearchProps) => {
    const [searchString, setSearchString] = useState<string>('');

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchString(value);
        searchUpdateCallback(value);

        analytics(value);
    };

    return (
        <div className={style.overviewSearch}>
            <TextField
                label={label}
                value={searchString}
                onChange={searchEventHandler}
            />
        </div>
    );
};
