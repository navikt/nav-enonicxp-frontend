import { MenuListItem } from './menuListItems';

export interface MainArticleDataProps {
    ingress: string;
    menuListItems: MenuListItem;
    text: string;
    hasTableOfContents: string;
    fact: string;
    social: string[];
    picture: {
        target: {}
        size: string;
        caption: string;
        altText: string;
    }
}