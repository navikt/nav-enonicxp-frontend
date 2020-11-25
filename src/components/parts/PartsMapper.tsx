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
import Veilederpanel from 'nav-frontend-veilederpanel';
import { MainArticle } from './main-article/MainArticle';
import { PartComponent } from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';

type Props = {
    componentProps: PartComponent;
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
    [PartType.PageHeading]: PageHeading,
    [PartType.PageList]: PageList,
};

const partsWithOwnData: { [key in PartWithOwnData] } = {
    [PartType.Alert]: Alert,
    [PartType.Header]: null,
    [PartType.LinkPanel]: LinkPanel,
    [PartType.ReadMorePanel]: LesMerPanel,
    [PartType.SupervisorPanel]: Veilederpanel,
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
