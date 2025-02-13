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
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { classNames } from 'utils/classnames';
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
                <Header size="large" level="2">
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
                            <LenkeBase
                                href={href}
                                className={style.linkPanel}
                                analyticsComponent="Lenkepanel navno enkel"
                                analyticsLinkGroup={title}
                            >
                                <div className={style.icon}>
                                    {
                                        // Hardkoder ikonene istedenfor å legge de inn i Enonic da det
                                        // kun er her vi bruker ikoner
                                        <>
                                            {(href.includes('saksbehandlingstider') ||
                                                title.includes('Saksbehandlingstider')) && (
                                                <BriefcaseClockIcon title="Koffert med klokke" />
                                            )}
                                            {(href.includes('utbetalingsdatoer') ||
                                                title.includes('Utbetalingsdatoer')) && (
                                                <CalendarIcon title="Kalender" />
                                            )}
                                            {(href.includes('satser') ||
                                                title.includes('Satser og beløp')) && (
                                                <WalletIcon title="Lommebok" />
                                            )}
                                            {(href.includes('soknader') ||
                                                title.includes('Søknad og skjema')) && (
                                                <TasklistStartIcon title="Oppgaveliste start" />
                                            )}
                                            {(href.includes('ettersende') ||
                                                title.includes('Ettersendelse')) && (
                                                <FolderFileIcon title="Mappefil" />
                                            )}
                                        </>
                                    }
                                </div>
                                <span className={style.text}>{title}</span>
                            </LenkeBase>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
