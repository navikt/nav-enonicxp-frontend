import React, { useEffect, useState } from 'react';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';
import {
    getCurrentOpeningHour,
    getOpeningState,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import {
    OpeningHour,
    RegularOpeningHours,
    SpecialOpeningHours,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpenInformationText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
import { processOpeningHours } from 'components/_common/contact-option/opening-info/helpers/processOpeningHours';

import style from './OpeningInfo.module.scss';
import { Loader } from '@navikt/ds-react';

type Props = {
    regularOpeningHours: RegularOpeningHours;
    specialOpeningHours: SpecialOpeningHours;
};

export const OpeningInfo = ({
    regularOpeningHours,
    specialOpeningHours,
}: Props) => {
    const { language } = usePageConfig();

    const [openingHour, setOpeningHour] = useState<OpeningHour | null>(null);

    const openingHoursMerged = processOpeningHours(
        regularOpeningHours.hours,
        specialOpeningHours.hours
    );

    useEffect(() => {
        const openingHour = getCurrentOpeningHour(openingHoursMerged);
        setOpeningHour(openingHour);
    }, [openingHoursMerged]);

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                getOpeningState(openingHour) === 'openNow'
                    ? style.open
                    : style.closed
            )}
        >
            <>
                {openingHour === null ? (
                    <Loader size={'xsmall'} />
                ) : (
                    getOpenInformationText(openingHoursMerged, language)
                )}
            </>
        </Chip>
    );
};
