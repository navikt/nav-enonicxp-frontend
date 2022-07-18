import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './IllustrationStatic';
import { IllustrationAnimated } from './IllustrationAnimated';

interface IllustrationProps {
    illustration: AnimatedIconsProps;
    placement: string;
    className: string;
    isHovering?: boolean;
    preferStaticIllustration?: boolean;
}

export const Illustration = ({
    className,
    illustration,
    isHovering,
    preferStaticIllustration,
}: IllustrationProps) => {
    if (!illustration) {
        return null;
    }

    const hasStaticIllustration = () => {
        const { icons } = illustration.data;
        if (!icons) {
            return false;
        }

        const icon1 = icons[0]?.icon;
        const icon2 = icons[1]?.icon;

        return !!(icon1 || icon2);
    };

    const animationDataUrl = illustration.data?.lottieHover?.mediaUrl;

    if (
        hasStaticIllustration() &&
        (!animationDataUrl || preferStaticIllustration)
    ) {
        return (
            <IllustrationStatic
                illustration={illustration}
                className={className}
            />
        );
    }

    if (animationDataUrl) {
        return (
            <IllustrationAnimated
                dataUrl={animationDataUrl}
                className={className}
                isHovering={isHovering}
            />
        );
    }

    return null;
};
