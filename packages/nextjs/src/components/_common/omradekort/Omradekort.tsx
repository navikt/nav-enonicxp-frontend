import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
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
} & Omit<React.ComponentProps<typeof LinkPanel>, 'as'>;

export const Omradekort = ({ path, title, area, linkGroup, className, ...rest }: Props) => {
    const { layoutConfig } = useLayoutConfig();
    const analyticsLinkGroup = linkGroup ?? layoutConfig.title;

    if (!area) {
        return <EditorHelp text={'Velg en grafikk for kortet'} />;
    }

    return (
        <LinkPanel
            {...rest}
            border={false}
            href={path}
            analyticsLabel={title}
            analyticsComponent={'Områdekort'}
            analyticsLinkGroup={analyticsLinkGroup}
            className={classNames(style.linkPanel, graphicsStyle.expandOnHover, className)}
            as={LenkeBase}
        >
            <div className={title.length > 17 ? style.titleLong : style.titleShort}>
                <LinkPanel.Title>{title}</LinkPanel.Title>
            </div>
            <OmradekortGraphics type={area} insideCard />
        </LinkPanel>
    );
};
