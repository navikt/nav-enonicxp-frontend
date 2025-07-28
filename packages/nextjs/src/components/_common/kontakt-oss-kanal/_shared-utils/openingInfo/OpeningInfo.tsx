import React, { useEffect, useState } from 'react';
import { Loader } from '@navikt/ds-react';
import {
    RegularOpeningHours,
    SpecialOpeningHours,
} from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { usePageContentProps } from 'store/pageContext';
import TextWithIndicator from 'components/_common/textWithIndicator/TextWithIndicator';
import { getCurrentOpeningHours } from './helpers/openingInfoUtils';
import { OpeningHours } from './helpers/openingInfoTypes';
import { getOpeningInfoText } from './helpers/openingInfoText';
import { processOpeningHours } from './helpers/processOpeningHours';

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
