import React from 'react';
import { NotificationProps } from 'types/notification-props';
import LenkepanelNavNo from '../lenkepanel/LenkepanelNavNo';
import { ContentType } from 'types/content-props/_content-common';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { hasDescription, hasIngress } from 'types/_type-guards';
import { BEM } from 'utils/classnames';
import { formatDate } from 'utils/datetime';
import { translator } from 'translations';
import { PublicImage } from '../image/PublicImage';
import { getImageUrl } from '../../../utils/images';
import './Notification.less';

type Target = NotificationProps['data']['target'];

const iconsForType = {
    warning: <PublicImage imagePath={'/gfx/coronavirus.svg'} />,
    info: <PublicImage imagePath={'/gfx/globe.svg'} />,
};

const getUrl = (target: Target) => {
    switch (target.__typename) {
        case ContentType.ExternalLink:
        case ContentType.Url:
            return target.data?.url;
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
    if (!data) {
        return null;
    }

    const { type, showDescription, showUpdated, target, icon } = data;
    if (!target) {
        return null;
    }

    const description = showDescription && getDescription(target);
    const bem = BEM('notification');
    const getDateLabel = translator('dates', props.language);

    const iconUrl = getImageUrl(icon);
    const IconElement = iconUrl ? (
        <img src={iconUrl} alt={''} />
    ) : (
        iconsForType[type]
    );

    return (
        <LenkepanelNavNo
            href={getUrl(target)}
            tittel={getTitle(props)}
            ikon={IconElement}
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
