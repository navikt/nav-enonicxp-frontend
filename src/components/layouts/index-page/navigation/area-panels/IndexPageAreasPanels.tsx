import React from 'react';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaHeaderPanel } from './header-panel/AreaHeaderPanel';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';

import style from './IndexPageAreaPanels.module.scss';

type Props = {
    content: IndexPageContentProps;
    navigate: (path: string) => void;
};

export const IndexPageAreasPanels = ({ content, navigate }: Props) => {
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
                        navigate={navigate}
                        key={areaContent._id}
                    />
                );
            })}
        </div>
    );
};
