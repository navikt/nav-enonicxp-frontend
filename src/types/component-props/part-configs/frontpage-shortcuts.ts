import { AnimatedIconsProps } from 'types/content-props/animated-icons';

type Shortcut = {
    target: {
        _path: string;
        displayName: string;
        data: {
            url?: string;
            illustration?: AnimatedIconsProps;
            title?: string;
        };
    };
    customTitle: string;
    customIllustration?: AnimatedIconsProps;
};

export type PartConfigFrontpageShortcuts = {
    title?: string;
    bgColor?: string;
    itemColor?: string;
    hoverColor?: string;
    shortcuts: Shortcut[];
};
