import { ChangeEvent, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import style from './OverviewSearch.module.scss';

type OverviewSearchProps = {
    searchUpdateCallback: any;
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
