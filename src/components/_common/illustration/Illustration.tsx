import React from 'react';

import { AnimatedIconsProps } from 'types/content-props/animated-icons';

import { IllustrationStatic } from './static/IllustrationStatic';
import { IllustrationAnimated } from './animated/IllustrationAnimated';
import { FallbackChevron } from './static/FallbackChevron';

type Props = {
    illustration?: AnimatedIconsProps;
    isHovering?: boolean;
    preferStaticIllustration?: boolean;
    className?: string;
    withFallbackIllustration?: boolean;
};

export const Illustration = ({
    illustration,
    isHovering,
    preferStaticIllustration,
    className,
    withFallbackIllustration,
}: Props) => {
    if (!illustration) {
        return withFallbackIllustration ? <FallbackChevron className={className} /> : null;
    }

    const animationDataUrl = illustration.data.lottieHover?.mediaUrl;
    if (!animationDataUrl || preferStaticIllustration) {
        return <IllustrationStatic illustration={illustration} className={className} />;
    }

    return (
        <IllustrationAnimated
            dataUrl={animationDataUrl}
            className={className}
            isHovering={!!isHovering}
        />
    );
};
