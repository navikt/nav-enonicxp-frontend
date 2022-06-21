import React from 'react';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaHeaderPanel } from './header-panel/AreaHeaderPanel';

import style from './IndexPageAreaPanels.module.scss';

type Props = {
    content: IndexPageContentProps;
};

export const IndexPageAreaPanels = ({ content }: Props) => {
    const { data } = content;
    const { areasRefs } = data;

    return (
        <div className={style.panels}>
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
