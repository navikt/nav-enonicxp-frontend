import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { FrontpageShortcutsProps } from 'types/component-props/parts/frontpage-shortcuts';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { FancyChevron } from '../../_common/chevron/FancyChevron';
import { classNames } from '../../../utils/classnames';

import style from './FrontpageShortcuts.module.scss';
import chevronStyle from '../../_common/chevron/FancyChevronCommon.module.scss';

export const FrontpageShortcuts = ({ config }: FrontpageShortcutsProps) => {
    const { contentList, title } = config;

    if (!contentList) {
        return <EditorHelp text={'Velg en innholdsliste'} />;
    }

    return (
        <div className={style.shortcuts}>
            <Header
                size="large"
                level="2"
                justify="left"
                className={style.header}
            >
                {title}
            </Header>
            <div className={style.list}>
                {contentList.data.sectionContents.map((item) => (
                    <LinkPanelNavno
                        href={item._path}
                        linkText={item.displayName}
                        linkUnderline={'onHover'}
                        linkColor={'black'}
                        icon={<FancyChevron color={'blue'} scale={0.6} />}
                        className={classNames(
                            style.item,
                            chevronStyle.animateOnHover
                        )}
                        key={item._id}
                    />
                ))}
            </div>
        </div>
    );
};
