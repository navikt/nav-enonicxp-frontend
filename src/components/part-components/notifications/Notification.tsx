import React from 'react';
import { NotificationProps } from '../../../types/content-types/notification-props';
import LenkepanelPluss from '../lenkepanel/LenkepanelPluss';
import { ContentType } from '../../../types/content-types/_schema';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { PulsatingIcon } from './icons/PulsatingIcon';
import { InfoIcon } from './icons/InfoIcon';
import './Notification.less';
import {
    hasDescription,
    hasIngress,
} from '../../../types/content-types/_type-utils';
import { BEM } from '../../../utils/bem';

type Target = NotificationProps['data']['target'];

const iconsForType = {
    warning: <PulsatingIcon />,
    info: <InfoIcon />,
};

const getUrl = (target: Target) => {
    switch (target.__typename) {
        case ContentType.ExternalLink:
            return target.data.url;
        default:
            return target._path;
    }
};

const getTitle = ({ displayName, data }: NotificationProps) => {
    return data.title || data.target?.displayName || displayName;
};

const getDescription = ({ data }: Target) => {
    return (
        (hasIngress(data) && data.ingress) ||
        (hasDescription(data) && data.description) ||
        ''
    );
};

export const Notification = (props: NotificationProps) => {
    const { data, modifiedTime } = props;
    const { type, showDescription, showUpdated, target } = data;
    const description = showDescription && getDescription(target);
    const bem = BEM('notification');

    return (
        <LenkepanelPluss
            href={getUrl(target)}
            tittel={getTitle(props)}
            ikon={iconsForType[type]}
            className={bem()}
        >
            <>
                {description && (
                    <Normaltekst className={bem('description')}>
                        {description}
                    </Normaltekst>
                )}
                {showUpdated && (
                    <Undertekst
                        className={bem('updated')}
                    >{`Sist oppdatert: ${modifiedTime}`}</Undertekst>
                )}
            </>
        </LenkepanelPluss>
    );
};

export default Notification;
