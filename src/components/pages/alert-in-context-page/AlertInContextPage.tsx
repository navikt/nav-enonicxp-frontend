import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';

import { AlertInContextPageProps } from 'types/content-props/alerts';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import style from './AlertInContextPage.module.scss';
import { AlertInContext } from 'components/_common/alert-in-context/AlertInContext';

export const AlertInContextPage = (props: AlertInContextPageProps) => {
    return (
        <div className={style.alertInContextPage}>
            <AlertInContext alert={props} />
        </div>
    );
};
