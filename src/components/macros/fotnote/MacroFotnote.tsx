import React from 'react';
import { FotnoteMacroProps } from '../../../types/macro-props/fotnote';
import './MacroFotnote.less';

export const MacroFotnote = ({ config }: FotnoteMacroProps) => {
    if (!config?.fotnote) {
        return null;
    }

    const { fotnote } = config.fotnote;

    return <sup className={'macro-fotnote'}>{fotnote}</sup>;
};
