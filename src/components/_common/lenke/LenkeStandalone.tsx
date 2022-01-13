import React from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { BEM, classNames } from 'utils/classnames';
import { LenkeBase } from './LenkeBase';
import { getExternalDomain } from '../../../utils/links';
import { Chevron } from '../chevron/Chevron';

const getExternalUrlString = (url: string, linkText: string) => {
    const externalDomain = getExternalDomain(url);

    if (externalDomain) {
        // Don't append the domain name if the link text already includes it...
        if (linkText.includes(externalDomain)) {
            return null;
        }

        return ` (${externalDomain})`;
    }

    return null;
};

const bem = BEM('navno-lenke');

type Props = {
    href: string;
    label?: string;
    className?: string;
    component?: string;
    linkGroup?: string;
    withChevron?: boolean;
    showExternalLinkLabel?: boolean;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeStandalone = ({
    href,
    label,
    className,
    component,
    linkGroup,
    withChevron = true,
    showExternalLinkLabel,
    children,
    analyticsLabel,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            href={href}
            className={classNames(
                bem(),
                withChevron && bem(undefined, 'chevron'),
                className
            )}
            component={component}
            linkGroup={linkGroup}
            analyticsLabel={
                analyticsLabel ||
                (typeof children === 'string' ? children : undefined)
            }
            {...rest}
        >
            <BodyShort className={bem('lenketekst')} as={'span'}>
                {withChevron && (
                    <span className={bem('icon-container')}>
                        <Chevron />
                    </span>
                )}
                <>
                    {children}
                    {showExternalLinkLabel &&
                        getExternalUrlString(href, children.toString())}
                </>
            </BodyShort>
            {label && (
                <BodyLong size="small" className={bem('label')} as={'span'}>
                    {label}
                </BodyLong>
            )}
        </LenkeBase>
    );
};
