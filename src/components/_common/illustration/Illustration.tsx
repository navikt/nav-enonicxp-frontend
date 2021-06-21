import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { IllustrationStatic } from './IllustrationStatic';
import { IllustrationAnimated } from './IllustrationAnimated';

import './Illustration.less';

interface IllustrationProps {
    illustration: AnimatedIconsProps;
    placement: string;
    className: string;
    isHovering?: boolean;
}

export const Illustration = ({
    className,
    illustration,
    isHovering,
}: IllustrationProps) => {
    if (!illustration) {
        return null;
    }

    const isAnimated = true; // Check for lottie file here lates

    if (isAnimated) {
        return (
            <IllustrationAnimated
                illustration={illustration}
                className={className}
                isHovering={isHovering}
            />
        );
    }

    return (
        <IllustrationStatic illustration={illustration} className={className} />
    );
};
