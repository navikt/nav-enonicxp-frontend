import React, { useEffect, useState } from 'react';
import { AreaPageProps } from '../../../../../../types/content-props/index-pages-props';
import { IndexPageContentProps } from '../../../IndexPage';
import { ContentType } from '../../../../../../types/content-props/_content-common';
import { classNames } from '../../../../../../utils/classnames';
import { AreaHeaderPanelExpanded } from './expanded/AreaHeaderPanelExpanded';
import { getPublicPathname } from '../../../../../../utils/urls';
import { AreaCard } from 'components/_common/area-card/AreaCard';
import { WarningFilled } from '@navikt/ds-icons';

import { IndexPageLink } from '../../link/IndexPageLink';

import style from './AreaPanel.module.scss';

const AreaCardPlaceholder = ({
    areaContent,
}: {
    areaContent: AreaPageProps;
    className?: string;
}) => {
    const path = getPublicPathname(areaContent);

    return (
        <IndexPageLink
            href={path}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <span>{areaContent.data.header}</span>
            <WarningFilled className={style.icon} />
        </IndexPageLink>
    );
};

type Props = {
    areaContent: AreaPageProps;
    currentContent: IndexPageContentProps;
};

export const AreaHeaderPanel = ({ areaContent, currentContent }: Props) => {
    const { __typename, _id } = currentContent;

    const [currentId, setCurrentId] = useState(_id);
    const [currentType, setCurrentType] = useState<ContentType>(__typename);
    const [prevType, setPrevType] = useState<ContentType>();

    const path = getPublicPathname(areaContent);

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
            <AreaCard
                path={path}
                title={areaContent.displayName}
                area={areaContent.data.area}
            ></AreaCard>
        </div>
    );
};
