import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

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

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    pageProps: ContentProps<ContentType.FrontPage>;
    config: {
        title?: string;
        bgColor?: string;
        itemColor?: string;
        hoverColor?: string;
        shortcuts: Shortcut[];
    };
}
