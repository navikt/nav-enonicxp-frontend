import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import Config from 'config';
import { WriteData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/Icon';

import style from './ContactOption.module.scss';

type Props = WriteData;

export const WriteOption = ({ ingress, url, alertText, title }: Props) => {
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('write');

    return (
        <div className={style.contactOption}>
            <Icon type="write" />
            <div className={style.content}>
                <LenkeBase
                    href={url || Config.urls.skrivTilOss}
                    analyticsLinkGroup={layoutConfig.title}
                    analyticsComponent={'Kontakt-oss kanal'}
                    className={style.link}
                >
                    <div className={style.linkContent}>
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
        </div>
    );
};
