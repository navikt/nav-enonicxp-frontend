import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { WriteData } from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import Config from 'config';
import {
    hoverFocusIcon,
    useHoverAndFocus,
} from './opening-info/helpers/iconUtils';

import style from './ContactOption.module.scss';

type Props = WriteData & {
    alertText?: string;
};

export const WriteOption = ({ ingress, url, alertText, title }: Props) => {
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const { isActive, handlers } = useHoverAndFocus();

    const translations = translator('contactPoint', language)('write');

    return (
        <div className={style.contactOption}>
            <LenkeBase
                {...handlers}
                href={url || Config.urls.skrivTilOss}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
            >
                <div className={style.linkContent}>
                    {hoverFocusIcon({
                        iconDefault: 'message.svg',
                        iconActive: 'message-filled.svg',
                        isActive: isActive,
                        style: style.icon,
                    })}
                    <Heading level="3" size="small">
                        {title || translations.title}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" className={style.alert} inline>
                    {alertText}
                </Alert>
            )}
            <BodyLong as="div" className={style.text}>
                <ParsedHtml htmlProps={ingress || translations.ingress} />
            </BodyLong>
        </div>
    );
};
