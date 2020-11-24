import React from 'react';
import { NotificationProps } from 'types/content-props/notification-props';
import LenkepanelNavNo from '../../_common/lenkepanel/LenkepanelNavNo';
import { ContentType } from 'types/content-props/_content-common';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { PulsatingIcon } from './icons/PulsatingIcon';
import { InfoIcon } from './icons/InfoIcon';
import { hasIngress } from 'types/_type-guards';
import { hasDescription } from 'types/_type-guards';
import { BEM } from 'utils/bem';
import { formatDate } from 'utils/datetime';
import { translator } from 'translations';
import './Notification.less';

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
    const getDateLabel = translator('dates', props.language);

    return (
        <LenkepanelNavNo
            href={getUrl(target)}
            tittel={getTitle(props)}
            ikon={iconsForType[type]}
            className={bem()}
            component={'notifications'}
        >
            <>
                {description && (
                    <Normaltekst className={bem('description')}>
                        {description}
                    </Normaltekst>
                )}
                {showUpdated && (
                    <Undertekst className={bem('updated')}>
                        {`${getDateLabel('lastChanged')}: ${formatDate(
                            modifiedTime
                        )}`}
                    </Undertekst>
                )}
            </>
        </LenkepanelNavNo>
    );
};

export default Notification;
