import React, { useEffect, useState } from 'react';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';
import { getCurrentOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpeningInfoText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
import { processOpeningHours } from 'components/_common/contact-option/opening-info/helpers/processOpeningHours';

import style from './OpeningInfo.module.scss';
import { Loader } from '@navikt/ds-react';
import {
    RegularOpeningHours,
    SpecialOpeningHours,
} from 'types/component-props/parts/contact-option';

type Props = {
    regularOpeningHours: RegularOpeningHours;
    specialOpeningHours: SpecialOpeningHours;
};

export const OpeningInfo = ({
    regularOpeningHours,
    specialOpeningHours,
}: Props) => {
    const { language } = usePageConfig();

    const [openingInfo, setOpeningInfo] = useState<OpeningInfoProps | null>(
        null
    );
    const [openingInfoText, setOpeningInfoText] = useState('');

    useEffect(() => {
        const allOpeningInfo = processOpeningHours(
            regularOpeningHours.hours,
            specialOpeningHours.hours
        );

        const currentOpeningInfo = getCurrentOpeningInfo(allOpeningInfo);

        const infoText = getOpeningInfoText({
            allOpeningInfo,
            currentOpeningInfo,
            language,
        });

        setOpeningInfo(currentOpeningInfo);
        setOpeningInfoText(infoText);
    }, [regularOpeningHours.hours, specialOpeningHours.hours, language]);

    if (!openingInfo) {
        return <Loader size={'xsmall'} />;
    }

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                openingInfo.status === 'OPEN' ? style.open : style.closed
            )}
        >
            {openingInfoText}
        </Chip>
    );
};
