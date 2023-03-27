import React, { useEffect, useState } from 'react';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';
import { getCurrentOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpenInformationText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
import { processOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/processOpeningInfo';

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

    const [currentOpeningInfo, setCurrentOpeningInfo] =
        useState<OpeningInfoProps | null>(null);

    const allOpeningInfo = processOpeningInfo(
        regularOpeningHours.hours,
        specialOpeningHours.hours
    );

    useEffect(() => {
        setCurrentOpeningInfo(getCurrentOpeningInfo(allOpeningInfo));
    }, [allOpeningInfo]);

    if (!currentOpeningInfo) {
        return <Loader size={'xsmall'} />;
    }

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                currentOpeningInfo.status === 'OPEN' ? style.open : style.closed
            )}
        >
            <>
                {getOpenInformationText(
                    allOpeningInfo,
                    currentOpeningInfo,
                    language
                )}
            </>
        </Chip>
    );
};
