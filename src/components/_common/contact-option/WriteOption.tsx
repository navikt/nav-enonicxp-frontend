import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { WriteData } from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import Config from 'config';

import style from './ContactOption.module.scss';

type Props = WriteData & {
    alertText?: string;
};

export const WriteOption = (props: Props) => {
    const { ingress, url, alertText, title } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    return (
        <div className={style.contactOption}>
            <LenkeBase
                href={url || Config.urls.skrivTilOss}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
            >
                <div className={style.linkContent}>
                    <div className={classNames(style.icon, style['write'])} />
                    <Heading level="3" size="small">
                        {title || getTranslations('write').title}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" className={style.alert} inline>
                    {alertText}
                </Alert>
            )}
            <BodyLong as="div" className={style.text}>
                {ingress ? (
                    <ParsedHtml htmlProps={ingress} />
                ) : (
                    getTranslations('write').ingress
                )}
            </BodyLong>
        </div>
    );
};
