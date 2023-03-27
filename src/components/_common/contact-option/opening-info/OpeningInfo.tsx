import React, { useEffect, useState } from 'react';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';
import { getCurrentOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpenInformationText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
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

    const [openingHour, setOpeningHour] = useState<OpeningInfoProps | null>(
        null
    );

    const openingHours = processOpeningHours(
        regularOpeningHours.hours,
        specialOpeningHours.hours
    );

    useEffect(() => {
        const openingHour = getCurrentOpeningInfo(openingHours);
        setOpeningHour(openingHour);
    }, [openingHours]);

    if (!openingHour) {
        return <Loader size={'xsmall'} />;
    }

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                openingHour.status === 'OPEN' ? style.open : style.closed
            )}
        >
            <>{getOpenInformationText(openingHours, language)}</>
        </Chip>
    );
};
