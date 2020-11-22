import React from 'react';
import { GlobalPageProps } from '../../../types/content/_common';
import { ComponentProps } from '../../../types/components/_components';
import { Text } from '../../parts/_dynamic/text/Text';
import Image from '../../parts/_dynamic/image/Image';
import { PartType } from '../../../types/components/parts';
import PageHeading from '../../parts/page-heading/PageHeading';
import { LinkPanels } from '../../parts/link-panels/LinkPanels';
import LinkLists from '../../parts/link-lists/LinkLists';
import { MainArticleLinkedList } from '../../parts/main-article-linked-list/MainArticleLinkedList';
import MainPanels from '../../parts/main-panels/MainPanels';
import { MenuList } from '../../parts/menu-list/MenuList';
import PageList from '../../parts/page-list/PageList';
import { LinkPanel } from '../../parts/_dynamic/link-panel/LinkPanel';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Alert from '../../parts/_dynamic/alert/Alerstripe';
import LesMerPanel from '../../parts/_dynamic/les-mer-panel/LesMerPanel';
import Regions from './Regions';

type Props = {
    componentProps: ComponentProps;
    pageProps: GlobalPageProps;
};

const partsWithGlobalData = {
    [PartType.LinkLists]: LinkLists,
    [PartType.LinkPanels]: LinkPanels,
    [PartType.MainArticleLinkedList]: MainArticleLinkedList,
    [PartType.MainPanels]: MainPanels,
    [PartType.MenuList]: MenuList,
    [PartType.PageHeading]: PageHeading,
    [PartType.PageList]: PageList,
};

const partsWithOwnData = {
    [PartType.Alert]: Alert,
    [PartType.LinkPanel]: LinkPanel,
    [PartType.ReadMorePanel]: LesMerPanel,
    [PartType.SupervisorPanel]: Veilederpanel,
};

const hiddenParts = {
    [PartType.Notifications]: true,
    [PartType.BreakingNews]: true,
    [PartType.PageCrumbs]: true,
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    if (componentProps.type === 'text') {
        return <Text {...componentProps} />;
    }

    if (componentProps.type === 'image') {
        return <Image imageUrl={componentProps.image.imageUrl} />;
    }

    if (componentProps.type === 'part') {
        const { descriptor } = componentProps;

        const PartWithGlobalData = partsWithGlobalData[descriptor];
        if (PartWithGlobalData) {
            return <PartWithGlobalData {...pageProps} />;
        }

        const PartWithOwnData = partsWithOwnData[descriptor];
        if (PartWithOwnData) {
            return <PartWithOwnData {...componentProps} />;
        }

        if (hiddenParts[descriptor]) {
            return null;
        }

        return <div>{`Unimplemented part: ${descriptor}`}</div>;
    }

    if (componentProps.type === 'layout') {
        return (
            <Regions pageProps={pageProps} regions={componentProps.regions} />
        );
    }

    return <div>{`Unimplemented component type: ${componentProps.type}`}</div>;
};
