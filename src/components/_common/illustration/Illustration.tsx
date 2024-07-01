import React from 'react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { IllustrationStatic } from './static/IllustrationStatic';
import { FallbackChevron } from './static/FallbackChevron';

type Props = {
    illustration?: PictogramsProps;
    className?: string;
    tryFallbackIllustration?: boolean;
};

export const Illustration = ({ illustration, className, tryFallbackIllustration }: Props) => {
    if (!illustration) {
        return tryFallbackIllustration ? <FallbackChevron className={className} /> : null;
    }

    return <IllustrationStatic illustration={illustration} className={className} />;
};
