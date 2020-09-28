import React from 'react';
import {
    NotificationProps,
    NotificationType,
} from '../../../types/content-types/notification-props';
import LenkepanelPluss from '../lenkepanel/LenkepanelPluss';
import {
    ContentType,
    ContentTypeSchema,
} from '../../../types/content-types/_schema';

import infoIconAsset from '/public/gfx/info-sirkel-fyll.svg';
import { Undertekst } from 'nav-frontend-typografi';

const PulsatingIcon = () => (
    <>
        <div className={'icon__pulse'} />
        <div className={'icon__center'} />
    </>
);

const InfoIcon = () => <img src={infoIconAsset} alt={''} />;

const iconsForType = {
    warning: <PulsatingIcon />,
    info: <InfoIcon />,
};

const getUrl = (target: ContentTypeSchema) => {
    switch (target.__typename) {
        case ContentType.ExternalLink:
            return target.data.url;
        default:
            return target._path;
    }
};

export const Notification = ({ data, modifiedTime }: NotificationProps) => {
    const { type, title, showDescription, showUpdated, target } = data;

    return (
        <LenkepanelPluss
            href={getUrl(target)}
            tittel={title}
            ikon={iconsForType[type]}
        >
            <>
                {showUpdated && <Undertekst>{modifiedTime}</Undertekst>}
                {/* TODO: showDescription med alle varianter... */}
            </>
        </LenkepanelPluss>
    );
};

export default Notification;
