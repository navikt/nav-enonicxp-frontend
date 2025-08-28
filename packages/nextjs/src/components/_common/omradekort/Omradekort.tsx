import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { classNames } from 'utils/classnames';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { OmradekortGraphics } from './graphics/OmradekortGraphics';

import style from './Omradekort.module.scss';
import graphicsStyle from './graphics/OmradekortGraphicsCommon.module.scss';

type Props = {
    path: string;
    title: string;
    area: string;
    linkGroup?: string;
    className?: string;
} & React.ComponentProps<typeof LinkCard>;

export const Omradekort = ({ path, title, area, linkGroup, className, ...rest }: Props) => {
    const { layoutConfig } = useLayoutConfig();
    const analyticsLinkGroup = linkGroup ?? layoutConfig.title;

    if (!area) {
        return <EditorHelp text={'Velg en grafikk for kortet'} />;
    }

    return (
        <LinkCard
            {...rest}
            arrow={false}
            className={classNames(style.lenkepanel, graphicsStyle.expandOnHover, className)}
        >
            <LinkCard.Title className={title.length > 17 ? style.titleLong : style.titleShort}>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        href={path}
                        analyticsLabel={title}
                        analyticsComponent={'Områdekort'}
                        analyticsLinkGroup={analyticsLinkGroup}
                        className={style.lenkebase}
                    >
                        {title}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <OmradekortGraphics type={area} insideCard />
        </LinkCard>
    );
};
