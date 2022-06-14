import React from 'react';
import { ContentType } from '../../../../../types/content-props/_content-common';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import LenkepanelNavNo from '../../../../_common/lenkepanel/LenkepanelNavNo';

import style from './IndexPageNavigationPanels.module.scss';

type Props = {
    type: ContentType.FrontPage | ContentType.AreaPage;
    areasRefs: AreaPageProps[];
    navigationCallback: (path: string) => void;
};

export const IndexPageNavigationPanels = ({
    areasRefs,
    type,
    navigationCallback,
}: Props) => {
    return (
        <div className={style.panels}>
            {type === ContentType.FrontPage
                ? areasRefs.map((ref) => (
                      <LenkepanelNavNo
                          href={ref.data.customPath || ref._path}
                          onClick={(e) => {
                              e.preventDefault();
                              navigationCallback(
                                  ref.data.customPath || ref._path
                              );
                          }}
                          tittel={ref.displayName}
                          key={ref._id}
                      >
                          {ref.data.description}
                      </LenkepanelNavNo>
                  ))
                : null}
        </div>
    );
};
