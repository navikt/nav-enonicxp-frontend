import React, { useEffect, useState } from 'react';
import { Chip } from 'components/_common/chip/Chip';
import { classNames } from 'utils/classnames';
import { getCurrentOpeningHours } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { OpeningHours } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpeningInfoText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
import { processOpeningHours } from 'components/_common/contact-option/opening-info/helpers/processOpeningHours';
import { Loader } from '@navikt/ds-react';
import {
    RegularOpeningHours,
    SpecialOpeningHours,
} from 'types/component-props/parts/contact-option';

import style from './OpeningInfo.module.scss';

type Props = {
    regularOpeningHours: RegularOpeningHours;
    specialOpeningHours: SpecialOpeningHours;
};

export const OpeningInfo = ({
    regularOpeningHours,
    specialOpeningHours,
}: Props) => {
    const { language } = usePageConfig();

    const [currentOpeningHours, setCurrentOpeningHours] =
        useState<OpeningHours | null>(null);
    const [openingInfoText, setOpeningInfoText] = useState('');

    useEffect(() => {
        const allOpeningHours = processOpeningHours(
            regularOpeningHours.hours,
            specialOpeningHours.hours
        );

        const _currentOpeningHours = getCurrentOpeningHours(allOpeningHours);

        const infoText = getOpeningInfoText({
            allOpeningHours,
            currentOpeningHours: _currentOpeningHours,
            language,
        });

        setCurrentOpeningHours(_currentOpeningHours);
        setOpeningInfoText(infoText);
    }, [regularOpeningHours.hours, specialOpeningHours.hours, language]);

    if (!currentOpeningHours) {
        return <Loader size={'xsmall'} />;
    }

    return (
        <Chip
            className={classNames(
                style.openingStatus,
                currentOpeningHours.status === 'OPEN'
                    ? style.open
                    : style.closed
            )}
        >
            {openingInfoText}
        </Chip>
    );
};
