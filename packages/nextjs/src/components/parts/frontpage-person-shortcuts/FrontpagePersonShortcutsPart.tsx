import React from 'react';
import {
    BriefcaseClockIcon,
    CalendarIcon,
    FolderFileIcon,
    TasklistStartIcon,
    WalletIcon,
} from '@navikt/aksel-icons';
import { Heading } from 'components/_common/headers/Heading';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
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
        <section className={style.personShortcuts}>
            {sectionTitle && (
                <Heading size="large" level="2">
                    {sectionTitle}
                </Heading>
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
                            <LenkeBase
                                href={href}
                                className={style.lenkepanel}
                                analyticsComponent="FrontpagePersonShortcutsPart"
                                analyticsLinkGroup={sectionTitle}
                            >
                                <div className={style.icon}>
                                    {
                                        // Hardkoder ikonene istedenfor å legge de inn i Enonic da det
                                        // kun er her vi bruker ikoner
                                    }
                                    {href.includes('saksbehandlingstider') && (
                                        <BriefcaseClockIcon title="Koffert med klokke" />
                                    )}
                                    {href.includes('utbetalingsdatoer') && (
                                        <CalendarIcon title="Kalender" />
                                    )}
                                    {href.includes('satser') && <WalletIcon title="Lommebok" />}
                                    {href.includes('soknader') && (
                                        <TasklistStartIcon title="Oppgaveliste start" />
                                    )}
                                    {href.includes('ettersende') && (
                                        <FolderFileIcon title="Mappefil" />
                                    )}
                                </div>
                                <span className={style.text}>{title}</span>
                            </LenkeBase>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
