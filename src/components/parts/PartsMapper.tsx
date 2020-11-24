import React from 'react';
import {
    PartComponent,
    PartDeprecated,
    PartType,
    PartWithOwnData,
    PartWithPageData,
} from '../../types/component-props/parts';
import { GlobalPageProps } from '../../types/content-props/_content-common';
import LinkLists from './link-lists/LinkLists';
import { LinkPanels } from './link-panels/LinkPanels';
import { MainArticleLinkedList } from './main-article-linked-list/MainArticleLinkedList';
import MainPanels from './main-panels/MainPanels';
import { MenuList } from './menu-list/MenuList';
import PageHeading from './page-heading/PageHeading';
import PageList from './page-list/PageList';
import Alert from './_dynamic/alert/Alerstripe';
import { LinkPanel } from './_dynamic/link-panel/LinkPanel';
import LesMerPanel from './_dynamic/les-mer-panel/LesMerPanel';
import Veilederpanel from 'nav-frontend-veilederpanel';

type Props = {
    componentProps: PartComponent;
    pageProps: GlobalPageProps;
};

const partsWithPageData: { [key in PartWithPageData] } = {
    [PartType.LinkLists]: LinkLists,
    [PartType.LinkPanels]: LinkPanels,
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
