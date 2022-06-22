import React from 'react';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaHeaderPanel } from './header-panel/AreaHeaderPanel';

import style from './IndexPageAreaPanels.module.scss';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';

type Props = {
    content: IndexPageContentProps;
};

export const IndexPageAreaPanels = ({ content }: Props) => {
    const { __typename, data } = content;
    const { areasRefs } = data;

    return (
        <div
            className={classNames(
                __typename === ContentType.FrontPage && style.panels
            )}
        >
            {areasRefs.map((areaContent) => {
                return (
                    <AreaHeaderPanel
                        areaContent={areaContent}
                        currentContent={content}
                        key={areaContent._id}
                    />
                );
            })}
        </div>
    );
};
