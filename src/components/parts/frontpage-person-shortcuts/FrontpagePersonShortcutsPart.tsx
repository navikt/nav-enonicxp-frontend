import React from 'react';
import {
    BriefcaseClockIcon,
    CalendarIcon,
    FolderFileIcon,
    TasklistStartIcon,
    WalletIcon,
} from '@navikt/aksel-icons';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LinkPanelNavnoSimple } from 'components/_common/linkpanel/LinkPanelNavnoSimple/LinkPanelNavnoSimple';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import style from './FrontpagePersonShortcutsPart.module.scss';

type Shortcut = {
    target: {
        _path: string;
        displayName: string;
        data: {
            url?: string;
            title?: string;
        };
    };
    customTitle: string;
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
        <div className={style.personShortcuts}>
            {sectionTitle && (
                <Header size="large" level="2" className={style.header}>
                    {sectionTitle}
                </Header>
            )}
            <ul className={style.list}>
                {shortcuts.map((item) => {
                    const { target, customTitle } = item;
                    if (!target?.data) {
                        return null;
                    }

                    const href = target.data.url || target._path;
                    const title = customTitle || target.data.title || target.displayName;

                    return (
                        <li key={title} className={style.listItem}>
                            <LinkPanelNavnoSimple
                                href={href}
                                analyticsLinkGroup={title}
                                className={style.link}
                                //Hardkoder ikonene istedenfor å legge de inn i Enonic da det
                                //kun er her vi bruker ikoner
                                icon={
                                    <>
                                        {title === 'Saksbehandlingstider' && (
                                            <BriefcaseClockIcon title="Koffert med klokke" />
                                        )}
                                        {title === 'Utbetalingsdatoer' && (
                                            <CalendarIcon title="Kalender" />
                                        )}
                                        {title === 'Satser' && <WalletIcon title="Lommebok" />}
                                        {title === 'Søknad og skjema' && (
                                            <TasklistStartIcon title="Oppgaveliste start" />
                                        )}
                                        {title === 'Ettersendelse' && (
                                            <FolderFileIcon title="Mappefil" />
                                        )}
                                    </>
                                }
                                iconClassname={style.icon}
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
