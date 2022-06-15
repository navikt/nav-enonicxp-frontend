import React from 'react';
import { AreaPageProps } from '../../../../../../types/content-props/index-pages-props';
import { IndexPageContentProps } from '../../../IndexPage';
import { ContentType } from '../../../../../../types/content-props/_content-common';
import { WarningFilled } from '@navikt/ds-icons';
import { classNames } from '../../../../../../utils/classnames';

import style from './AreaPanel.module.scss';

const AreaCardPlaceholder = ({
    areaContent,
    navigationCallback,
    className,
}: {
    areaContent: AreaPageProps;
    navigationCallback: (path: string) => void;
    className: string;
}) => {
    const { _id, _path, data } = areaContent;
    const { header, customPath } = data;

    const path = customPath || _path;

    return (
        <a
            href={path}
            onClick={(e) => {
                e.preventDefault();
                navigationCallback(path);
            }}
            className={classNames(style.areaPanel, className)}
        >
            <span>{header}</span>
            <WarningFilled className={style.icon} />
        </a>
    );
};

type Props = {
    areaContent: AreaPageProps;
    currentContent: IndexPageContentProps;
    navigationCallback: (path: string) => void;
};

export const AreaPanel = ({
    areaContent,
    currentContent,
    navigationCallback,
}: Props) => {
    const { __typename: currentType, _id: currentId } = currentContent;

    return currentType === ContentType.AreaPage &&
        areaContent._id === currentId ? (
        <div className={style.areaPanelActive}>
            <span>{'Placeholder!'}</span>
            <WarningFilled className={style.icon} />
        </div>
    ) : (
        <AreaCardPlaceholder
            areaContent={areaContent}
            navigationCallback={navigationCallback}
            className={classNames(
                currentType === ContentType.AreaPage && style.areaPanelHidden
            )}
        />
    );
};
