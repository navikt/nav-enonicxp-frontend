import React, { useEffect, useState } from 'react';
import { AreaPageProps } from '../../../../../../types/content-props/index-pages-props';
import { IndexPageContentProps } from '../../../IndexPage';
import { ContentType } from '../../../../../../types/content-props/_content-common';
import { WarningFilled } from '@navikt/ds-icons';
import { classNames } from '../../../../../../utils/classnames';
import { AreaHeaderPanelExpanded } from './expanded/AreaHeaderPanelExpanded';
import { getPublicPathname } from '../../../../../../utils/urls';
import { AreaCard } from 'components/_common/area-card/AreaCard';

import style from './AreaPanel.module.scss';

const AreaCardPlaceholder = ({
    areaContent,
    navigationCallback,
}: {
    areaContent: AreaPageProps;
    navigationCallback: (path: string) => void;
    className?: string;
}) => {
    const path = getPublicPathname(areaContent);

    return (
        <a
            href={path}
            onClick={(e) => {
                e.preventDefault();
                navigationCallback(path);
            }}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <span>{areaContent.data.header}</span>
            <WarningFilled className={style.icon} />
        </a>
    );
};

type Props = {
    areaContent: AreaPageProps;
    currentContent: IndexPageContentProps;
    navigationCallback: (path: string) => void;
};

export const AreaHeaderPanel = ({
    areaContent,
    currentContent,
    navigationCallback,
}: Props) => {
    const { __typename, _id } = currentContent;

    const [currentId, setCurrentId] = useState(_id);
    const [currentType, setCurrentType] = useState<ContentType>(__typename);
    const [prevType, setPrevType] = useState<ContentType>();

    useEffect(() => {
        if (currentId === _id) {
            return;
        }

        setCurrentId(_id);
        setPrevType(currentType);
        setCurrentType(__typename);
    }, [__typename, currentType, currentId, _id]);

    const useFrontpageTransition =
        prevType === ContentType.FrontPage &&
        currentType === ContentType.AreaPage;

    return __typename === ContentType.AreaPage &&
        areaContent._id === currentId ? (
        <div
            className={classNames(
                style.areaPanel,
                style.areaPanelActive,
                useFrontpageTransition && style.animate
            )}
        >
            <AreaHeaderPanelExpanded areaContent={currentContent} />
        </div>
    ) : (
        <div
            className={classNames(
                style.areaPanel,
                currentType === ContentType.AreaPage && style.areaPanelHidden,
                useFrontpageTransition && style.animate
            )}
        >
            {/* <AreaCardPlaceholder
                areaContent={areaContent}
                navigationCallback={navigationCallback}
            /> */}
            <AreaCard
                href={areaContent._path}
                title={areaContent.displayName}
                area={areaContent.data.area}
            ></AreaCard>
        </div>
    );
};
