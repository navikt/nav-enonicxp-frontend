import { ContentType } from './_content-common';
import { XpImageProps } from '../media';

export type AnimatedIcon = {
    icon?: XpImageProps;
};

export type AnimatedIconsData = {
    icons: AnimatedIcon[];
    lottieHover?: { mediaUrl: string };
};

export interface AnimatedIconsProps {
    type: ContentType.AnimatedIcons;
    data: AnimatedIconsData;
}
