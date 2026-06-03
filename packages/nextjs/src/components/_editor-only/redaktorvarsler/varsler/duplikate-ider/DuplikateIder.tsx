import React from 'react';
import { useDuplikateIder } from './useDuplikateIder';
import { DuplikateIderVarsel } from './DuplikateIderVarsel';

type Props = {
    className?: string;
};

export const DuplikateIder = ({ className }: Props) => {
    const { unikeDuplikatIder, elementerMedDuplikateIder } = useDuplikateIder();

    if (unikeDuplikatIder.length === 0) return null;

    return (
        <DuplikateIderVarsel
            unikeDuplikatIder={unikeDuplikatIder}
            elementerMedDuplikateIder={elementerMedDuplikateIder}
            className={className}
        />
    );
};
