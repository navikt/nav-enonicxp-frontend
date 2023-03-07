import { ContentType } from './_content-common';
import { XpImageProps } from '../media';

export type AnimatedIcon = {
    icon?: XpImageProps;
    transformStart?: string;
    transformEnd?: string;
    transformOrigin?: string;
};

export type AnimatedIconsData = {
    icons: AnimatedIcon[];
    lottieHover?: { mediaUrl: string };
};

export interface AnimatedIconsProps {
    type: ContentType.AnimatedIcons;
    data: AnimatedIconsData;
}
