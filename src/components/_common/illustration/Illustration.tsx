import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './static/IllustrationStatic';
import { FallbackChevron } from './static/FallbackChevron';

type Props = {
    illustration?: AnimatedIconsProps;
    className?: string;
    tryFallbackIllustration?: boolean;
};

export const Illustration = ({ illustration, className, tryFallbackIllustration }: Props) => {
    if (!illustration) {
        return tryFallbackIllustration ? <FallbackChevron className={className} /> : null;
    }

    return <IllustrationStatic illustration={illustration} className={className} />;
};
