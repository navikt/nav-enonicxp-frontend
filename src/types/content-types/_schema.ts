import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { SectionPageProps } from './section-page-props';
import { TransportPageProps } from './transport-page-props';
import { ContentListProps } from './content-list-props';
import { EnonicContentRef } from '../../utils/paths';
import { LegacyProps } from './legacy-props';
import { PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { SiteProps } from './site-props';
import { ErrorProps } from './error-props';
import { NotificationProps } from './notification-props';
import exp from 'constants';

export enum ContentType {
    Legacy = 'legacy',
    Error = 'error',
    Site = 'portal_Site',
    InternalLink = 'no_nav_navno_InternalLink',
    ExternalLink = 'no_nav_navno_ExternalLink',
    SectionPage = 'no_nav_navno_SectionPage',
    TransportPage = 'no_nav_navno_TransportPage',
    ContentList = 'no_nav_navno_ContentList',
    PageList = 'no_nav_navno_PageList',
    MainArticle = 'no_nav_navno_MainArticle',
    Notification = 'no_nav_navno_Notification',
}

export type ContentTypeSchema =
    | LegacyProps
    | ErrorProps
    | SiteProps
    | ExternalLinkProps
    | InternalLinkProps
    | SectionPageProps
    | TransportPageProps
    | ContentListProps
    | PageListProps
    | MainArticleProps
    | NotificationProps;

export type GlobalSchema = {
    __typename: ContentType;
    _id: EnonicContentRef;
    _path: EnonicContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    data: object;
    didRedirect?: boolean;
    isDraft?: boolean;
};

/*
   "page":{
      "type":"page",
      "path":"/",
      "descriptor":"no.nav.navno:main-page",
      "config":{
      },
      "regions":{
         "main":{
            "components":[
               {
                  "path":"/main/0",
                  "type":"image",
                  "image":"001d6ad4-1f1b-47a2-a14d-6521e0c4880a"
               }
            ],
            "name":"main"
         }
      }
   },
   "components":[
      {
         "type":"page",
         "path":"/"
      },
      {
         "type":"image",
         "path":"/main/0",
         "image":{
            "image":{
               "imageUrl":"http://lo.jpg"
            }
         }
      }
 */

export interface GlobalPageSchema extends GlobalSchema {
    components?: Component[];
    page?: Page;
}

export interface Page {
    type: string;
    descriptor: string;
    path: string;
    config: object;
    regions?: Regions;
}

export interface Image {
    image: {
        imageUrl: string;
    };
}

export interface Component {
    type: 'image';
    path: string;
    image: Image;
}

export type RegionComponent =
    | {
          type: 'text';
          path: string;
          text: {
              value: string;
          };
      }
    | {
          type: 'image';
          path: string;
          image: string;
      }
    | {
          type: 'layout';
          path: string;
          regions: Regions;
      };

export interface Regions {
    main: Region;
    first: Region;
    second: Region;
    result: Region;
    searchbar: Region;
}

export interface Region {
    name: string;
    components: RegionComponent[];
}
