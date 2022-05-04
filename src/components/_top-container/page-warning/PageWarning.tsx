import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Translations } from '../../../translations/default';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { classNames } from '../../../utils/classnames';

import style from './PageWarning.module.scss';

type Props = {
    labelKey: keyof Translations['pageWarnings'];
    whiteBg?: boolean;
};

export const PageWarning = ({ labelKey, whiteBg }: Props) => {
    const { language } = usePageConfig();
    const getDraftLabels = translator('pageWarnings', language);

    return (
        <div className={classNames(style.container, whiteBg && style.whiteBg)}>
            <AlertBox
                variant={'warning'}
                size={'small'}
                className={style.warning}
            >
                {getDraftLabels(labelKey)}
            </AlertBox>
        </div>
    );
};
