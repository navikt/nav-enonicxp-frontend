import React from 'react';
import { PressLandingPageProps } from '../../../types/content-props/dynamic-page-props';
import { PressTopSection } from 'components/_common/press-landing/PressTopSection';

export const PressLandingPage = (props: PressLandingPageProps) => {
    return (
        <div className={'pressLandingPage'}>
            <PressTopSection page={props} />
            some stuff here
        </div>
    );
};
