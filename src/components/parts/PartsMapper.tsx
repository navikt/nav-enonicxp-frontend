import React from 'react';
import {
    PartDeprecated,
    PartType,
    PartWithOwnData,
    PartWithPageData,
} from '../../types/component-props/parts';
import LinkLists from './link-lists/LinkLists';
import { LinkPanels } from './link-panels/LinkPanels';
import { MainArticleLinkedList } from './main-article-linked-list/MainArticleLinkedList';
import MainPanels from './main-panels/MainPanels';
import { MenuList } from './menu-list/MenuList';
import PageHeading from './page-heading/PageHeading';
import PageList from './page-list/PageList';
import Alert from './_dynamic/alert/Alert';
import { LinkPanel } from './_dynamic/link-panel/LinkPanel';
import LesMerPanel from './_dynamic/les-mer-panel/LesMerPanel';
import { MainArticle } from './main-article/MainArticle';
import { PartComponentProps } from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';
import Veilederpanel from './_dynamic/veilederpanel/Veilederpanel';
import { OfficeInformation } from './office-information/OfficeInformation';
import { Header } from './_dynamic/header/Header';
import { LinkList } from './_dynamic/link-list/LinkList';
import { NewsList } from './_dynamic/news-list/NewsList';

type Props = {
    componentProps: PartComponentProps;
    pageProps: ContentProps;
};

const partsWithPageData: {
    [key in PartWithPageData]: React.FunctionComponent<ContentProps>;
} = {
    [PartType.LinkLists]: LinkLists,
    [PartType.LinkPanels]: LinkPanels,
    [PartType.MainArticle]: MainArticle,
    [PartType.MainArticleLinkedList]: MainArticleLinkedList,
    [PartType.MainPanels]: MainPanels,
    [PartType.MenuList]: MenuList,
    [PartType.OfficeInformation]: OfficeInformation,
    [PartType.PageHeading]: PageHeading,
    [PartType.PageList]: PageList,
};

const partsWithOwnData: {
    [key in PartWithOwnData]: React.FunctionComponent<PartComponentProps>;
} = {
    [PartType.Alert]: Alert,
    [PartType.Header]: Header,
    [PartType.LinkPanel]: LinkPanel,
    [PartType.ReadMorePanel]: LesMerPanel,
    [PartType.SupervisorPanel]: Veilederpanel,
    [PartType.LinkList]: LinkList,
    [PartType.NewsList]: NewsList,
};

const partsHidden: { [key in PartDeprecated] } = {
    [PartType.Notifications]: true,
    [PartType.BreakingNews]: true,
    [PartType.PageCrumbs]: true,
};

export const PartsMapper = ({ componentProps, pageProps }: Props) => {
    const { descriptor } = componentProps;

    const PartWithGlobalData = partsWithPageData[descriptor];
    if (PartWithGlobalData) {
        return <PartWithGlobalData {...pageProps} />;
    }

    const PartWithOwnData = partsWithOwnData[descriptor];
    if (PartWithOwnData) {
        return <PartWithOwnData {...componentProps} />;
    }

    if (partsHidden[descriptor]) {
        return null;
    }

    return <div>{`Unimplemented part: ${descriptor}`}</div>;
};
