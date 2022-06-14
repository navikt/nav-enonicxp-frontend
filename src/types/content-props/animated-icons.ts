import { ContentType, ContentCommonProps } from './_content-common';
import { XpImageProps } from '../media';

type AnimatedIcon = {
    icon: XpImageProps;
    transformStart: string;
    transformEnd: string;
    transformOrigin: string;
};

export type AnimatedIconsData = {
    icons: AnimatedIcon[];
    lottieHover?: { mediaText: string };
};

export interface AnimatedIconsProps extends ContentCommonProps {
    __typename: ContentType.AnimatedIcons;
    data: AnimatedIconsData;
}
