import React from 'react';
import { PartWithOwnData, PartWithPageData } from 'types/component-props/parts';
import { PartDeprecated, PartType } from 'types/component-props/parts';
import LinkLists from './link-lists/LinkLists';
import { LinkPanels } from './link-panels/LinkPanels';
import { MainArticleChapterNavigation } from './main-article-chapter-navigation/MainArticleChapterNavigation';
import MainPanels from './main-panels/MainPanels';
import { RelatedInfo } from './related-info/RelatedInfo';
import PageHeading from './page-heading/PageHeading';
import PageList from './page-list/PageList';
import Alert from './_dynamic/alert/Alert';
import { LinkPanel } from './_dynamic/link-panel/LinkPanel';
import LesMerPanel from './_dynamic/les-mer-panel/LesMerPanel';
import { MainArticle } from './main-article/MainArticle';
import {
    ComponentType,
    PartComponentProps,
} from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';
import Veilederpanel from './_dynamic/veilederpanel/Veilederpanel';
import { OfficeInformation } from './office-information/OfficeInformation';
import { Header } from './_dynamic/header/Header';
import { LinkList } from './_dynamic/link-list/LinkList';
import { NewsList } from './_dynamic/news-list/NewsList';
import PublishingCalendar from './publishing-calendar/PublishingCalendar';
import { BEM } from '../../utils/bem';

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
    [PartType.MainArticleLinkedList]: MainArticleChapterNavigation,
    [PartType.MainPanels]: MainPanels,
    [PartType.MenuList]: RelatedInfo,
    [PartType.OfficeInformation]: OfficeInformation,
    [PartType.PageHeading]: PageHeading,
    [PartType.PageList]: PageList,
    [PartType.PublishingCalendar]: PublishingCalendar,
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

const partsDeprecated: { [key in PartDeprecated] } = {
    [PartType.Notifications]: true,
    [PartType.BreakingNews]: true,
    [PartType.PageCrumbs]: true,
};

const PartComponent = ({ componentProps, pageProps }: Props) => {
    const { descriptor } = componentProps;

    const PartWithGlobalData = partsWithPageData[descriptor];
    if (PartWithGlobalData) {
        return <PartWithGlobalData {...pageProps} />;
    }

    const PartWithOwnData = partsWithOwnData[descriptor];
    if (PartWithOwnData) {
        return <PartWithOwnData {...componentProps} />;
    }

    if (partsDeprecated[descriptor]) {
        return null;
    }

    return <div>{`Unimplemented part: ${descriptor}`}</div>;
};

export const PartsMapper = (props: Props) => {
    const { path, descriptor } = props.componentProps;

    const bem = BEM(ComponentType.Part);
    const layoutName = descriptor.split(':')[1];

    return (
        <div
            className={bem(layoutName)}
            data-portal-component-type={ComponentType.Part}
            data-portal-component={path}
            data-th-remove="tag"
        >
            <PartComponent {...props} />
        </div>
    );
};
