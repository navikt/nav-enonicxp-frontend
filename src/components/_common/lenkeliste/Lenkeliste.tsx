import React, { useId } from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from '../lenke/LenkeStandalone';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';
import { ListType } from 'types/component-props/parts/link-list';

import style from './Lenkeliste.module.scss';

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    listType?: ListType;
    className?: string;
};

const ULWrapper = ({
    showAsList,
    children,
}: {
    showAsList: boolean;
    children: React.ReactNode;
}) =>
    showAsList ? <ul className={style.liste}>{children}</ul> : <>{children}</>;

const LIWrapper = ({
    showAsList,
    children,
}: {
    showAsList: boolean;
    children: React.ReactNode;
}) => (showAsList ? <li>{children}</li> : <>{children}</>);

export const Lenkeliste = ({
    tittel,
    lenker,
    listType = 'default',
    className,
}: Props) => {
    const headingId = `heading-linklist-${useId()}`;

    if (!lenker || lenker.length === 0) {
        return <EditorHelp text={'Tom lenkeliste'} />;
    }

    return (
        <nav
            className={classNames(className, style.lenker)}
            aria-labelledby={headingId}
        >
            {tittel && (
                <Heading
                    className={style.tittel}
                    id={headingId}
                    size="small"
                    level="2"
                >
                    {tittel}
                </Heading>
            )}
            <ULWrapper showAsList={listType === 'bulletlist'}>
                {lenker.map((lenke, index) => (
                    <LIWrapper
                        showAsList={listType === 'bulletlist'}
                        key={index}
                    >
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
                    </LIWrapper>
                ))}
            </ULWrapper>
        </nav>
    );
};
