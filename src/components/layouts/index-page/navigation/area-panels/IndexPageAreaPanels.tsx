import React from 'react';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaPanel } from './area-panel/AreaPanel';

import style from './IndexPageAreaPanels.module.scss';

type Props = {
    content: IndexPageContentProps;
    navigationCallback: (path: string) => void;
};

export const IndexPageAreaPanels = ({ content, navigationCallback }: Props) => {
    const { data } = content;
    const { areasRefs } = data;

    return (
        <div className={style.panels}>
            {areasRefs.map((areaContent) => {
                return (
                    <AreaPanel
                        areaContent={areaContent}
                        currentContent={content}
                        navigationCallback={navigationCallback}
                        key={areaContent._id}
                    />
                );
            })}
        </div>
    );
};
