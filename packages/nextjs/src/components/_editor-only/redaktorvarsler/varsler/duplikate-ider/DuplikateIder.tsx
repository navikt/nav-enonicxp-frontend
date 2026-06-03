import React from 'react';
import { DuplikateIderVarsel } from './DuplikateIderVarsel';

type Props = {
    unikeDuplikatIder: string[];
    elementerMedDuplikateIder: HTMLElement[];
    className?: string;
};

export const DuplikateIder = ({
    unikeDuplikatIder,
    elementerMedDuplikateIder,
    className,
}: Props) => {
    if (unikeDuplikatIder.length === 0) return null;

    return (
        <DuplikateIderVarsel
            unikeDuplikatIder={unikeDuplikatIder}
            elementerMedDuplikateIder={elementerMedDuplikateIder}
            className={className}
        />
    );
};
