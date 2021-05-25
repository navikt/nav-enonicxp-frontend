import React from 'react';
import { MacroFotnoteProps } from '../../../types/macro-props/fotnote';
import './MacroFotnote.less';

export const MacroFotnote = ({ config }: MacroFotnoteProps) => {
    if (!config?.fotnote) {
        return null;
    }

    const { fotnote } = config.fotnote;

    return <sup className={'macro-fotnote'}>{fotnote}</sup>;
};
