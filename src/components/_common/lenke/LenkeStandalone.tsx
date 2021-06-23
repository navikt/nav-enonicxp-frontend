import React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Undertekst } from 'nav-frontend-typografi';
import { BEM, classNames } from 'utils/classnames';
import { LenkeBase } from './LenkeBase';
import { getExternalDomain } from '../../../utils/links';
import './LenkeStandalone.less';

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
    const bem = BEM('navno-lenke');

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
            <span className={bem('lenketekst')}>
                {withChevron && (
                    <span className={bem('icon-container')}>
                        <HoyreChevron className={bem('chevron')} />
                    </span>
                )}
                <>
                    {children}
                    {showExternalLinkLabel &&
                        getExternalUrlString(href, children.toString())}
                </>
            </span>
            {label && <Undertekst className={bem('label')}>{label}</Undertekst>}
        </LenkeBase>
    );
};
