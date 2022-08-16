import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { WriteData } from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

import style from './ContactOption.module.scss';
import { ProcessedHtmlProps } from 'types/processed-html-props';

interface WriteOptionProps extends WriteData {
    _path?: string;
    ingress: string & ProcessedHtmlProps;
}

export const WriteOption = (props: WriteOptionProps) => {
    const { ingress, title, url } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    const getTitle = () => {
        return title || getTranslations('write').title;
    };

    console.log(ingress);

    const getIngress = () => {
        return (
            <ParsedHtml
                htmlProps={ingress || getTranslations('write').ingress}
            />
        );
    };

    return (
        <div className={style.contactOption}>
            <LenkeBase
                href={url || '/person/kontakt-oss/nb/skriv-til-oss'}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
            >
                <div className={style.linkContent}>
                    <div className={classNames(style.icon, style['write'])} />
                    <Heading level="3" size="small">
                        {getTitle()}
                    </Heading>
                </div>
            </LenkeBase>
            <div className={style.text}>{getIngress()}</div>
        </div>
    );
};
