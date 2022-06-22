import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { IndexPageLink } from 'components/layouts/index-page/navigation/link/IndexPageLink';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from '../../../utils/classnames';
import { AreaCardGraphics } from './graphics/AreaCardGraphics';

import style from './AreaCard.module.scss';
import graphicsStyle from './graphics/AreaCardGraphicsCommon.module.scss';

type Props = {
    path: string;
    title: string;
    area: string;
    navigate: (path: string) => void;
};

export const AreaCard = ({ path, title, area, navigate }: Props) => {
    if (!area) {
        return <EditorHelp text={'Velg en grafikk for kortet'} />;
    }

    return (
        <LinkPanel
            border={false}
            className={classNames(style.linkPanel, graphicsStyle.expandOnHover)}
            as={(props) => (
                <IndexPageLink
                    {...props}
                    href={path}
                    analyticsLabel={title}
                    component="area-card"
                    navigate={navigate}
                >
                    {props.children}
                </IndexPageLink>
            )}
        >
            <div
                className={
                    title.length > 17 ? style.titleLong : style.titleShort //TODO Finne en bedre løsning? Width settes også i px
                }
            >
                <LinkPanel.Title>{title}</LinkPanel.Title>
            </div>
            <AreaCardGraphics type={area} />
        </LinkPanel>
    );
};
