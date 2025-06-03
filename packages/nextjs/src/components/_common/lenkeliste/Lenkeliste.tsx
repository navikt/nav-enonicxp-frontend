import React, { useId } from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

import style from './Lenkeliste.module.scss';

export type ListType = 'default' | 'chevron' | 'bulletlist';

const WrapUL = ({ showAsList, children }: { showAsList: boolean; children: React.ReactNode }) =>
    showAsList ? <ul className={style.ulListe}>{children}</ul> : <>{children}</>;

const WrapLI = ({ showAsList, children }: { showAsList: boolean; children: React.ReactNode }) =>
    showAsList ? <li>{children}</li> : <>{children}</>;

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    className?: string;
    listType: ListType;
};

export const Lenkeliste = ({ tittel, lenker, listType, className }: Props) => {
    const { language } = usePageContentProps();
    const getLabel = translator('linkList', language);
    const headingId = `heading-linklist-${useId()}`;

    if (!lenker || lenker.length === 0) {
        return <EditorHelp text={'Tom lenkeliste'} />;
    }

    return (
        <nav
            className={classNames(className, style.lenker)}
            aria-labelledby={tittel ? headingId : undefined}
            aria-label={tittel ? undefined : getLabel('label')}
        >
            {tittel && (
                <Heading className={style.tittel} id={headingId} size="small" level="2">
                    {tittel}
                </Heading>
            )}
            <WrapUL showAsList={listType === 'bulletlist'}>
                {lenker.map((lenke, index) => (
                    <WrapLI showAsList={listType === 'bulletlist'} key={index}>
                        <LenkeStandalone
                            href={lenke.url}
                            label={lenke.label}
                            className={style.lenke}
                            component={'link-list'}
                            linkGroup={tittel}
                            withChevron={listType === 'chevron'}
                        >
                            {lenke.text}
                        </LenkeStandalone>
                    </WrapLI>
                ))}
            </WrapUL>
        </nav>
    );
};
