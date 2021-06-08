import React from 'react';
import { MicroCardProps } from '../../../../types/component-props/parts/micro-card';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import './MicroCard.less';


export const MicroCardPart = ({ config }: MicroCardProps) => {
    if (!config.targetPage) {
        return <div >{'Tom felt'}</div>;
    }
    return <LenkeBase href={config.targetPage._path}> <div className="micro-card"> {config.targetPage.displayName}</div></LenkeBase>;
};

