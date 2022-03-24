import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Translations } from '../../../translations/default';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import React, { useState } from 'react';

import style from './PageWarning.module.scss';
import { ClearIcon } from '../../pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { Button } from '../../_common/button/Button';

type Props = {
    labelKey: keyof Translations['pageWarnings'];
};

export const PageWarning = ({ labelKey }: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const { language } = usePageConfig();
    const getDraftLabels = translator('pageWarnings', language);

    return (
        isOpen && (
            <div className={style.container}>
                <AlertBox
                    variant={'warning'}
                    size={'small'}
                    className={style.warning}
                >
                    {getDraftLabels(labelKey)}
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                        }}
                    >
                        {'Lukk varsel'}
                        <ClearIcon />
                    </Button>
                </AlertBox>
            </div>
        )
    );
};
