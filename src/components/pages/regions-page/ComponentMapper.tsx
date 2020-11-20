import React from 'react';
import { GlobalPageProps } from '../../../types/content-types/_schema';
import { ComponentProps } from '../../../types/components/_common';
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

const UnimplementedFallback = (props: ComponentProps) => (
    <div>{`Unimplemented ${props.type}: ${props.descriptor}`}</div>
);

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    if (componentProps.type === 'text') {
        return <Text {...componentProps} />;
    }

    if (componentProps.type === 'image') {
        return null; // <Image {...componentProps} />
    }

    if (componentProps.type === 'part') {
        const { descriptor } = componentProps;

        if (partsWithGlobalData[descriptor]) {
            const Component = partsWithGlobalData[descriptor];
            return <Component {...pageProps} />;
        }

        if (partsWithOwnData[descriptor]) {
            const Component = partsWithOwnData[descriptor];
            return <Component {...componentProps} />;
        }

        if (hiddenParts[descriptor]) {
            return null;
        }
    }

    if (componentProps.type === 'layout') {
        return (
            <Regions pageProps={pageProps} regions={componentProps.regions} />
        );
    }

    return <UnimplementedFallback {...componentProps} />;
};
