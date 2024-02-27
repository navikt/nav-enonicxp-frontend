import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './IllustrationStatic';
import { IllustrationAnimated } from './IllustrationAnimated';
import { FallbackChevron } from './FallbackChevron';

type Props = {
    illustration?: AnimatedIconsProps;
    isHovering?: boolean;
    preferStaticIllustration?: boolean;
    className?: string;
    fallbackIllustration?: boolean;
};

export const Illustration = ({
    illustration,
    isHovering,
    preferStaticIllustration,
    className,
    fallbackIllustration,
}: Props) => {
    if (!illustration && !fallbackIllustration) {
        return null;
    }

    if (!illustration && fallbackIllustration) {
        return <FallbackChevron className={className} />;
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
