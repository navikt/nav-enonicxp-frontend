import React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Undertekst } from 'nav-frontend-typografi';
import { BEM, classNames } from 'utils/classnames';
import { LenkeBase } from './LenkeBase';
import { isNavUrl } from '../../../utils/paths';
import { PublicImage } from '../image/PublicImage';
import './LenkeStandalone.less';

type Props = {
    href: string;
    label?: string;
    className?: string;
    component?: string;
    linkGroup?: string;
    withChevron?: boolean;
    showExternalLinkIcon?: boolean;
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
    showExternalLinkIcon,
    children,
    analyticsLabel,
    ...rest
}: Props) => {
    const bem = BEM('navno-lenke');

    return (
        <LenkeBase
            href={href}
            className={classNames(bem(), className)}
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
                {showExternalLinkIcon && !isNavUrl(href) ? (
                    <span>
                        {children}
                        <PublicImage
                            imagePath={'/gfx/external-link-icon.svg'}
                            className={bem('icon-external')}
                        />
                    </span>
                ) : (
                    <>{children}</>
                )}
            </span>
            {label && <Undertekst className={bem('label')}>{label}</Undertekst>}
        </LenkeBase>
    );
};
