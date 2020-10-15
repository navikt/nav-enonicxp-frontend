import { Checkbox, Radio } from 'nav-frontend-skjema';
import { Undertekst } from 'nav-frontend-typografi';
import React from 'react';
import './FilterOption.less';

export type FilterOptionType = 'radio' | 'checkbox';

type Props = {
    label: string;
    name: string;
    count: number;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange: (args: any) => any;
    type: FilterOptionType;
};

export const FilterOption = ({
    label,
    name,
    count,
    checked,
    defaultChecked,
    onChange,
    type,
}: Props) => {
    const buttonProps = {
        label,
        name,
        checked,
        defaultChecked,
        onChange,
    };

    return (
        <div className={'search-filter-option'}>
            {type === 'radio' ? (
                <Radio {...buttonProps} />
            ) : (
                <Checkbox {...buttonProps} />
            )}
            <Undertekst className={'search-filter-option__count'}>
                {count}
            </Undertekst>
        </div>
    );
};
