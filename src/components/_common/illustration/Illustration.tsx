import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './IllustrationStatic';
import { IllustrationAnimated } from './IllustrationAnimated';

import './Illustration.less';

interface IllustrationProps {
    illustration: AnimatedIconsProps;
    placement: string;
    className: string;
    isHovering?: boolean;
    isPressed?: boolean;
    preferStaticIllustration?: boolean;
}

export const Illustration = ({
    className,
    illustration,
    isHovering,
    isPressed,
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

        const icon1 = icons[0] && icons[0].icon;
        const icon2 = icons[1] && icons[1].icon;

        return !!(icon1 && icon2);
    };

    const isAnimated = !!(
        illustration.data?.lottieActive?.mediaText &&
        illustration.data?.lottieHover?.mediaText
    );

    if (hasStaticIllustration() && (!isAnimated || preferStaticIllustration)) {
        return (
            <IllustrationStatic
                illustration={illustration}
                className={className}
            />
        );
    }

    if (isAnimated) {
        return (
            <IllustrationAnimated
                illustration={illustration}
                className={className}
                isHovering={isHovering}
                isPressed={isPressed}
            />
        );
    }

    return null;
};
