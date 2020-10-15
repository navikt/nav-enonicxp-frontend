import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Undertekst } from 'nav-frontend-typografi';
import { BEM } from '../../../../utils/bem';
import './FilterRadioPanel.less';

type Props = {
    label: string;
    count: number;
    isOpen: boolean;
    onClick: (args: any) => any;
    children: React.ReactNode | React.ReactNode[];
};

export const FilterRadioPanel = ({
    label,
    count,
    isOpen,
    onClick,
    children,
}: Props) => {
    const bem = BEM('radio-expanding-panel');

    const header = (
        <div className={bem('header')}>
            <Radio
                name={'search-facet'}
                label={label}
                checked={isOpen}
                readOnly={true}
            />
            <Undertekst className={bem('count')}>{count}</Undertekst>
        </div>
    );

    return (
        <EkspanderbartpanelBase
            tittel={header}
            apen={isOpen && !!children}
            onClick={onClick}
            border={false}
            className={bem()}
        >
            {children}
        </EkspanderbartpanelBase>
    );
};
