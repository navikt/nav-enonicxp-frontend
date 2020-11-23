import { MenuListItem } from './menuListItems';

export interface Picture {
    target: {
        imageUrl: string
    },
    size: string,
    caption: string
    altText: string
}
export interface MainArticleDataProps {
    ingress: string;
    menuListItems: MenuListItem;
    text: string;
    hasTableOfContents: string;
    fact: string;
    social: string[];
    picture: Picture;
}
