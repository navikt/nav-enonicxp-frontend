import React, { useEffect, useState } from 'react';
import { getCurrentOpeningHours } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { usePageContentProps } from 'store/pageContext';
import { OpeningHours } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { getOpeningInfoText } from 'components/_common/contact-option/opening-info/helpers/openingInfoText';
import { processOpeningHours } from 'components/_common/contact-option/opening-info/helpers/processOpeningHours';
import { Loader } from '@navikt/ds-react';
import {
    RegularOpeningHours,
    SpecialOpeningHours,
} from 'types/component-props/part-configs/contact-option';

import TextWithIndicator from 'components/_common/text-with-indicator/TextWithIndicator';

type Props = {
    regularOpeningHours: RegularOpeningHours;
    specialOpeningHours: SpecialOpeningHours;
    textPrefix?: string;
};

export const OpeningInfo = ({ regularOpeningHours, specialOpeningHours, textPrefix }: Props) => {
    const { language } = usePageContentProps();

    const [currentOpeningHours, setCurrentOpeningHours] = useState<OpeningHours | null>(null);
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
        <TextWithIndicator
            text={openingInfoText}
            prefix={textPrefix}
            isActive={currentOpeningHours.status === 'OPEN'}
        />
    );
};
