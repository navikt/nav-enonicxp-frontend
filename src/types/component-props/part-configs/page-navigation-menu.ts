export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
};

export type PageNavViewStyle = 'sidebar' | 'inContent';

export type PartConfigPageNavigationMenu = {
    title: string;
    anchorLinks: AnchorLink[];
    viewStyle: PageNavViewStyle;
};
