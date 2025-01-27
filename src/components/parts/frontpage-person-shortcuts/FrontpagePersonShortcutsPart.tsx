import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LinkPanelNavnoSimple } from 'components/_common/linkpanel/LinkPanelNavnoSimple/LinkPanelNavnoSimple';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { Icon } from 'types/content-props/pictograms';

type Shortcut = {
    target: {
        _path: string;
        displayName: string;
        data: {
            url?: string;
            icon?: Icon;
            title?: string;
        };
    };
    customTitle: string;
    customIcon?: Icon;
};

export type PartConfigFrontpagePersonShortcuts = {
    title?: string;
    shortcuts: Shortcut[];
};

export const FrontpagePersonShortcutsPart = ({
    config,
}: PartComponentProps<PartType.FrontpagePersonShortcuts>) => {
    const { shortcuts, title: sectionTitle } = config;

    if (!shortcuts || shortcuts.length === 0) {
        return <EditorHelp text={'Velg minst en snarvei'} />;
    }

    return (
        <div>
            {sectionTitle && (
                <Header size="large" level="2">
                    {sectionTitle}
                </Header>
            )}
            <ul>
                {shortcuts.map((item) => {
                    const { target, customTitle } = item;
                    if (!target?.data) {
                        return null;
                    }

                    const href = target.data.url || target._path;
                    const title = customTitle || target.data.title || target.displayName;
                    // const illustration = customIllustration || target.data.illustration;

                    return (
                        <li key={title}>
                            <LinkPanelNavnoSimple
                                href={href}
                                analyticsLinkGroup={title}
                                // icon={<IllustrationStatic illustration={illustration} />}
                            >
                                {title}
                            </LinkPanelNavnoSimple>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
