import { XpImageProps } from 'types/media';
import { ContentType } from './_content-common';

export type AnimatedIcon = {
    icon?: XpImageProps;
};

export type AnimatedIconsData = {
    icons: AnimatedIcon[];
};

export interface AnimatedIconsProps {
    type: ContentType.AnimatedIcons;
    data: AnimatedIconsData;
}
