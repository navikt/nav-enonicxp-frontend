import React from 'react';
import { MacroFotnoteProps } from 'types/macro-props/fotnote';
import { classNames } from 'utils/classnames';

export const MacroFotnote = ({ config }: MacroFotnoteProps) => {
    if (!config?.fotnote) {
        return null;
    }

    const { fotnote } = config.fotnote;

    return <sup className={classNames('macro-fotnote', 'navds-detail')}>{fotnote}</sup>;
};
