import React from 'react';
import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { PressTopSection } from 'components/_common/press-landing//PressTopSection/PressTopSection';
import { PressNews } from 'components/_common/press-landing/PressNews/PressNews';
import { PressShortcuts } from 'components/_common/press-landing/PressShortcuts/PressShortcuts';

export const PressLandingPage = (props: PressLandingPageProps) => {
    return (
        <>
            <PressTopSection page={props} />
            <PressNews page={props} />
            <PressShortcuts page={props} />
        </>
    );
};
