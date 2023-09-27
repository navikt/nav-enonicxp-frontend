import React, {useId} from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from '../lenke/LenkeStandalone';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';

import style from './Lenkeliste.module.scss';

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    withChevron?: boolean;
    className?: string;
};

export const Lenkeliste = ({
    tittel,
    lenker,
    withChevron = false,
    className,
}: Props) => {
    const headingId = `heading-linklist-${useId()}`;

    if (!lenker || lenker.length === 0) {
        return <EditorHelp text={'Tom lenkeliste'} />;
    }

    return (
        <nav className={classNames(className, style.lenker)}
             aria-labelledby={headingId}
        >
            {tittel && (
                <Heading className={style.tittel} id={headingId} size="small" level="2">
                    {tittel}
                </Heading>
            )}
            {lenker.map((lenke, index) => (
                <LenkeStandalone
                    href={lenke.url}
                    label={lenke.label}
                    key={index}
                    className={style.lenke}
                    component={'link-list'}
                    linkGroup={tittel}
                    withChevron={withChevron}
                >
                    {lenke.text}
                </LenkeStandalone>
            ))}
        </nav>
    );
};
