import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { IndexPageLink } from 'components/layouts/index-page/navigation/routing/IndexPageLink';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { classNames } from '../../../utils/classnames';
import { AreaCardGraphics } from './graphics/AreaCardGraphics';
import { LenkeBase } from '../lenke/LenkeBase';

import style from './AreaCard.module.scss';
import graphicsStyle from './graphics/AreaCardGraphicsCommon.module.scss';

type Props = {
    path: string;
    title: string;
    area: string;
    navigate?: (path: string) => void;
    linkGroup?: string;
    className?: string;
} & Omit<React.ComponentProps<typeof LinkPanel>, 'as'>;

export const AreaCard = ({
    path,
    title,
    area,
    navigate,
    linkGroup,
    className,
    ...rest
}: Props) => {
    if (!area) {
        return <EditorHelp text={'Velg en grafikk for kortet'} />;
    }

    const LinkComponent = navigate ? IndexPageLink : LenkeBase;

    return (
        <LinkPanel
            {...rest}
            border={false}
            className={classNames(
                style.linkPanel,
                graphicsStyle.expandOnHover,
                className
            )}
            as={(props) => (
                <LinkComponent
                    {...props}
                    href={path}
                    analyticsLabel={title}
                    analyticsComponent={'Områdekort'}
                    analyticsLinkGroup={linkGroup}
                    navigate={navigate}
                >
                    {props.children}
                </LinkComponent>
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
