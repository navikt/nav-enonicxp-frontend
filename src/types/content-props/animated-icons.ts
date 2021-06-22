import { ContentProps, ContentType } from './_content-common';
import { XpImageProps } from '../media';

type AnimatedIcon = {
    icon: XpImageProps;
    transformStart: string;
    transformEnd: string;
    transformOrigin: string;
};

export type AnimatedIconsData = {
    icons: AnimatedIcon[];
    lottieActive?: string;
    lottieHover?: string;
};

export interface AnimatedIconsProps extends ContentProps {
    __typename: ContentType.AnimatedIcons;
    data: AnimatedIconsData;
}
