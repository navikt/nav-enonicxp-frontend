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

    const isAnimated =
        illustration.data?.lottieActive?.mediaText &&
        illustration.data?.lottieHover?.mediaText;

    if (isAnimated && !preferStaticIllustration) {
        return (
            <IllustrationAnimated
                illustration={illustration}
                className={className}
                isHovering={isHovering}
                isPressed={isPressed}
            />
        );
    }

    return (
        <IllustrationStatic illustration={illustration} className={className} />
    );
};
