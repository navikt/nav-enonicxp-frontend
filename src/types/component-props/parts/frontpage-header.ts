import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

export interface FrontpageHeaderProps extends PartComponentProps {
    descriptor: PartType.FrontpageHeader;
    pageProps: ContentProps<ContentType.FrontPage>;
    config: {
        title: string;
        bgColor?: string;
    };
}
