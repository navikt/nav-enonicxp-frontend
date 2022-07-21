import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageCurrentTopicsProps } from 'types/component-props/parts/frontpage-current-topics';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { formatDate } from '../../../utils/datetime';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

import style from './FrontpageCurrentTopics.module.scss';

export const FrontpageCurrentTopics = ({
    config,
}: FrontpageCurrentTopicsProps) => {
    const { language } = usePageConfig();
    const { contentList, title } = config;

    if (!contentList) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    return (
        <div className={style.currentTopics}>
            <Header
                size={'large'}
                level={'2'}
                justify={'left'}
                className={style.header}
            >
                {title}
            </Header>
            <ul className={style.list}>
                {contentList.data.sectionContents.map((item) => (
                    <li key={item._id}>
                        <LinkPanelNavno
                            analyticsLinkGroup={title}
                            linkText={item.displayName}
                            linkTextSize={'medium'}
                            linkColor={'black'}
                            href={item._path}
                            className={style.item}
                        >
                            <span className={style.date}>
                                {formatDate(item.modifiedTime, language)}
                            </span>
                        </LinkPanelNavno>
                    </li>
                ))}
            </ul>
        </div>
    );
};
