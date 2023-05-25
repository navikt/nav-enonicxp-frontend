import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './IllustrationStatic';
import { IllustrationAnimated } from './IllustrationAnimated';

type Props = {
    illustration?: AnimatedIconsProps;
    isHovering?: boolean;
    preferStaticIllustration?: boolean;
    className?: string;
};

export const Illustration = ({
    illustration,
    isHovering,
    preferStaticIllustration,
    className,
}: Props) => {
    if (!illustration) {
        return null;
    }

    if (!preferStaticIllustration) {
        const animationDataUrl = illustration.data.lottieHover?.mediaUrl;
        if (animationDataUrl) {
            return (
                <IllustrationAnimated
                    dataUrl={animationDataUrl}
                    className={className}
                    isHovering={isHovering}
                />
            );
        }
    }

    return (
        <IllustrationStatic illustration={illustration} className={className} />
    );
};
