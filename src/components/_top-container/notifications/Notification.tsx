import React from 'react';
import { NotificationProps } from 'types/notification-props';
import LenkepanelNavNo from '../../_common/lenkepanel/LenkepanelNavNo';
import { ContentType } from 'types/content-props/_content-common';
import { BodyShort, BodyLong } from '@navikt/ds-react';
import { hasDescription, hasIngress } from 'types/_type-guards';
import { BEM } from 'utils/classnames';
import { formatDate } from 'utils/datetime';
import { translator } from 'translations';
import { PublicImage } from '../../_common/image/PublicImage';
import { XpImage } from '../../_common/image/XpImage';

type Target = NotificationProps['data']['target'];

const iconsForType = {
    warning: <PublicImage imagePath={'/gfx/coronavirus.svg'} alt={''} />,
    info: <PublicImage imagePath={'/gfx/globe.svg'} alt={''} />,
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
    const { data, language, modifiedTime } = props;
    if (!data) {
        return null;
    }

    const { type, showDescription, showUpdated, target, icon } = data;
    if (!target) {
        return null;
    }

    const description = showDescription && getDescription(target);
    const bem = BEM('notification');
    const getDateLabel = translator('dates', language);

    const IconElement = icon ? (
        <XpImage imageProps={icon} alt={''} />
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
            {(description || showUpdated) && (
                <>
                    {description && (
                        <BodyLong className={bem('description')}>
                            {description}
                        </BodyLong>
                    )}
                    {showUpdated && (
                        <BodyShort size="small" className={bem('updated')}>
                            {`${getDateLabel('lastChanged')}: ${formatDate(
                                modifiedTime,
                                language,
                                true
                            )}`}
                        </BodyShort>
                    )}
                </>
            )}
        </LenkepanelNavNo>
    );
};

export default Notification;
