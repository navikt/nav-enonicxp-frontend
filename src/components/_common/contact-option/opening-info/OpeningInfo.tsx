import React, { useState } from 'react';
import {
    OpeningHour,
    TelephoneData,
} from 'types/component-props/parts/contact-option';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';

import style from './OpeningInfo.module.scss';
import {
    getDates,
    getIsClosedForToday,
    mergeOpeningHours,
} from 'components/_common/contact-option/contactHelpers';
import dayjs from 'dayjs';
import { dateDiff, formatDate, getCurrentISODate } from 'utils/datetime';

type Props = {
    regularOpeningHours: TelephoneData['regularOpeningHours'];
    specialOpeningHours: TelephoneData['specialOpeningHours'];
};

export const OpeningInfo = ({
    regularOpeningHours,
    specialOpeningHours,
}: Props) => {
    const [isClosed, setIsClosed] = useState(false);

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                isClosed ? style.closed : style.open
            )}
        >
            {buildOpenInformationText(todaysOpeningHour)}
        </Chip>
    );
};
