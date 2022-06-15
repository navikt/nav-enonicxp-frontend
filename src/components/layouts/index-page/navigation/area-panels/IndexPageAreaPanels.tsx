import React from 'react';
import { ContentType } from '../../../../../types/content-props/_content-common';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import LenkepanelNavNo from '../../../../_common/lenkepanel/LenkepanelNavNo';

import style from './IndexPageAreaPanels.module.scss';
import { IndexPageContentProps } from '../../IndexPage';

type Props = {
    content: IndexPageContentProps;
    navigationCallback: (path: string) => void;
};

export const IndexPageAreaPanels = ({ content, navigationCallback }: Props) => {
    const { __typename, data } = content;
    const { areasRefs } = data;

    return (
        <div className={style.panels}>
            {areasRefs.map((ref) => (
                <LenkepanelNavNo
                    href={ref.data.customPath || ref._path}
                    onClick={(e) => {
                        e.preventDefault();
                        navigationCallback(ref.data.customPath || ref._path);
                    }}
                    tittel={ref.displayName}
                    key={ref._id}
                >
                    {ref.data.description}
                </LenkepanelNavNo>
            ))}
        </div>
    );
};
